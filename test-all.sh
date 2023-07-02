#!/usr/bin/env sh

# Script run all test without bugs and with all BUG_ID-s
echo "======== start SCREENSHOT CREATING ==============================================="
echo "======== WARNING! EMIT A LOT REPORTS. PAY NO ATTENTION. =========================="
echo "=================================================================================="
npm run test:e2e-quiet
echo "========== end SCREENSHOT CREATING ==============================================="
echo "======== start WITHOUT BUGS ======================================================"
npm run test:e2e-quiet 
npm run test:unit
echo "========== end WITHOUT BUGS ======================================================"
echo "======== start BUG_ID=1 =========================================================="
BUG_ID=1 npm run test:e2e-quiet
BUG_ID=1 npm run test:unit
echo "========== end BUG_ID=1 =========================================================="
echo "======== start BUG_ID=2 =========================================================="
BUG_ID=2 npm run test:e2e-quiet
BUG_ID=2 npm run test:unit
echo "========== end BUG_ID=2 =========================================================="
echo "======== start BUG_ID=3 =========================================================="
BUG_ID=3 npm run test:e2e-quiet
BUG_ID=3 npm run test:unit
echo "========== end BUG_ID=3 =========================================================="
echo "======== start BUG_ID=4 =========================================================="
BUG_ID=4 npm run test:e2e-quiet
BUG_ID=4 npm run test:unit
echo "========== end BUG_ID=4 =========================================================="
echo "======== start BUG_ID=5 =========================================================="
BUG_ID=5 npm run test:e2e-quiet
BUG_ID=5 npm run test:unit
echo "========== end BUG_ID=5 =========================================================="
echo "======== start BUG_ID=6 =========================================================="
BUG_ID=6 npm run test:e2e-quiet
BUG_ID=6 npm run test:unit
echo "========== end BUG_ID=6 =========================================================="
echo "======== start BUG_ID=7 =========================================================="
BUG_ID=7 npm run test:e2e-quiet
BUG_ID=7 npm run test:unit
echo "========== end BUG_ID=7 =========================================================="
echo "======== start BUG_ID=8 =========================================================="
BUG_ID=8 npm run test:e2e-quiet
BUG_ID=8 npm run test:unit
echo "========== end BUG_ID=8 =========================================================="
echo "======== start BUG_ID=9 =========================================================="
BUG_ID=9 npm run test:e2e-quiet
BUG_ID=9 npm run test:unit
echo "========== end BUG_ID=9 =========================================================="
echo "======== start BUG_ID=10 =========================================================="
BUG_ID=10 npm run test:e2e-quiet
BUG_ID=10 npm run test:unit
echo "========== end BUG_ID=10 =========================================================="