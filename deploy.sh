#!/bin/bash

# PitchAuto Complete Deployment Script
# This script sets up and deploys the entire PitchAuto platform

set -e

echo "🚀 PitchAuto Deployment Starting..."

# Check prerequisites
check_requirements() {
    echo "📋 Checking requirements..."
    
    command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed."; exit 1; }
    command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed."; exit 1; }
    command -v git >/dev/null 2>&1 || { echo "❌ Git is required but not installed."; exit 1; }
    
    echo "✅ All requirements met!"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
}

# Setup environment
setup_environment() {
    echo "🔧 Setting up environment..."
    
    if [ ! -f .env.local ]; then
        cp .env.example .env.local
        echo "⚠️  Please update .env.local with your API keys!"
        echo "   Required keys:"
        echo "   - OPENAI_API_KEY"
        echo "   - CLERK_SECRET_KEY"
        echo "   - DATABASE_URL"
        echo "   - STRIPE_SECRET_KEY"
    fi
}

# Setup database
setup_database() {
    echo "🗄️  Setting up database..."
    
    # Generate Prisma client
    npx prisma generate
    
    # Run migrations
    npx prisma migrate deploy
    
    # Seed database (optional)
    # npx prisma db seed
    
    echo "✅ Database ready!"
}

# Build application
build_application() {
    echo "🏗️  Building application..."
    npm run build
    echo "✅ Build complete!"
}

# Deploy to Vercel
deploy_vercel() {
    echo "☁️  Deploying to Vercel..."
    
    if command -v vercel >/dev/null 2>&1; then
        vercel --prod
    else
        echo "📦 Installing Vercel CLI..."
        npm i -g vercel
        vercel --prod
    fi
}

# Start local development
start_local() {
    echo "💻 Starting local development server..."
    npm run dev
}

# Main menu
show_menu() {
    echo ""
    echo "🎯 PitchAuto Deployment Options:"
    echo "1) Complete Setup & Deploy to Production"
    echo "2) Local Development Setup"
    echo "3) Deploy to Vercel Only"
    echo "4) Setup Database Only"
    echo "5) Exit"
    echo ""
    read -p "Select an option (1-5): " choice
    
    case $choice in
        1)
            check_requirements
            install_dependencies
            setup_environment
            setup_database
            build_application
            deploy_vercel
            echo "🎉 PitchAuto is live! Visit your Vercel URL."
            ;;
        2)
            check_requirements
            install_dependencies
            setup_environment
            setup_database
            start_local
            ;;
        3)
            build_application
            deploy_vercel
            ;;
        4)
            setup_database
            ;;
        5)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option"
            show_menu
            ;;
    esac
}

# ASCII Art Banner
cat << "EOF"
 ____  _ _       _       _         _        
|  _ \(_) |_ ___| |__   / \  _   _| |_ ___  
| |_) | | __/ __| '_ \ / _ \| | | | __/ _ \ 
|  __/| | || (__| | | / ___ \ |_| | || (_) |
|_|   |_|\__\___|_| |_/_/   \_\__,_|\__\___/ 
                                             
🚀 AI-Powered Proposals That Win Jobs
EOF

echo ""
echo "Welcome to PitchAuto Setup!"
echo "This script will help you deploy the complete platform."
echo ""

# Run main menu
show_menu