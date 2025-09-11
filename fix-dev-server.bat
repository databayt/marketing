@echo off
echo Fixing Next.js dev server permission issues...

echo.
echo Step 1: Killing all Node.js processes...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo ✅ Node.js processes terminated
) else (
    echo ⚠️  No Node.js processes found to terminate
)

echo.
echo Step 2: Removing .next directory...
if exist .next (
    rmdir /S /Q .next 2>nul
    if %errorlevel% equ 0 (
        echo ✅ .next directory removed successfully
    ) else (
        echo ❌ Could not remove .next directory - it may be in use
        echo Trying alternative approach...
        
        echo Step 2a: Removing specific locked files...
        del .next\trace 2>nul
        del .next\server\* /Q 2>nul
        del .next\static\* /Q /S 2>nul
    )
) else (
    echo ⚠️  .next directory doesn't exist
)

echo.
echo Step 3: Clearing npm/pnpm cache...
pnpm store prune
echo ✅ Package cache cleared

echo.
echo Step 4: Starting development server...
echo This should now work without permission issues...
echo.
pnpm dev