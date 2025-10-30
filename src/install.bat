@echo off
echo ========================================
echo  Doctor Booking App - Installation
echo ========================================
echo.

echo [1/3] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo Node.js found!
echo.

echo [2/3] Installing dependencies...
echo This might take 2-3 minutes...
echo.
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Installation failed!
    pause
    exit /b 1
)
echo.

echo [3/3] Installation complete!
echo.
echo ========================================
echo  Ready to start!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open: http://localhost:5173
echo.
pause
