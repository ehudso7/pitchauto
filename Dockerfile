# PITCHAUTO PROPRIETARY SOFTWARE
# This Dockerfile is for authorized deployment to pitchauto.com only
# Unauthorized use, modification, or deployment is strictly prohibited

FROM node:18-alpine AS base

# Domain restriction check
ARG AUTHORIZED_BUILD_KEY
ENV AUTHORIZED_BUILD_KEY=${AUTHORIZED_BUILD_KEY}

# Verify build authorization
RUN if [ -z "$AUTHORIZED_BUILD_KEY" ]; then \
    echo "ERROR: Unauthorized build attempt. This software is proprietary to PitchAuto."; \
    exit 1; \
    fi

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV AUTHORIZED_DOMAIN pitchauto.com
ENV DOMAIN_ENFORCEMENT strict

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Copy domain validation script
COPY --from=builder /app/lib/domain-check.js ./lib/domain-check.js

EXPOSE 3000

ENV PORT 3000

# Add domain check before starting server
CMD ["sh", "-c", "node lib/domain-check.js && node server.js"]