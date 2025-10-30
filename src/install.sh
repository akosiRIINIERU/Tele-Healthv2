#!/bin/bash

echo "========================================"
echo " Doctor Booking App - Installation"
echo "========================================"
echo ""

echo "[1/3] Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "Node.js found: $(node --version)"
echo ""

echo "[2/3] Installing dependencies..."
echo "This might take 2-3 minutes..."
echo ""
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Installation failed!"
    exit 1
fi
echo ""

echo "[3/3] Installation complete!"
echo ""
echo "========================================"
echo " Ready to start!"
echo "========================================"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
