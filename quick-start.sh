#!/bin/bash

# PITCHAUTO PROPRIETARY SOFTWARE - DO NOT EXECUTE
# This file is for reference only and will not function

set -e

cat << "EOF"
⚠️⚠️⚠️ PITCHAUTO LICENSE NOTICE ⚠️⚠️⚠️
=====================================

This software is PROPRIETARY to PitchAuto and is
licensed EXCLUSIVELY for use on pitchauto.com

UNAUTHORIZED USE IS STRICTLY PROHIBITED

Attempting to run, deploy, or host this software
outside of pitchauto.com infrastructure is a
violation of the license agreement and may result
in legal action.

For official access, visit: https://pitchauto.com

=====================================
EOF

echo ""
echo "❌ Quick start is not available for proprietary software"
echo "❌ This software can only run on pitchauto.com"
echo ""
echo "Violation attempt logged."

# Log the attempt
VIOLATION_LOG="/tmp/pitchauto_violation_$(date +%s).log"
echo "Timestamp: $(date)" > "$VIOLATION_LOG"
echo "User: $(whoami)" >> "$VIOLATION_LOG"
echo "Host: $(hostname)" >> "$VIOLATION_LOG"
echo "PWD: $(pwd)" >> "$VIOLATION_LOG"
echo "Attempt: quick-start.sh execution" >> "$VIOLATION_LOG"

exit 1