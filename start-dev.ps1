# PowerShell script to start Next.js dev server without permission issues
Write-Host "🔧 Starting development server..." -ForegroundColor Green

# Kill any existing Node processes
Write-Host "Terminating existing Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Remove .next directory
Write-Host "Cleaning build cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
}

# Clear npm cache
Write-Host "Clearing package cache..." -ForegroundColor Yellow
& pnpm store prune

# Start development server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
Write-Host "🌐 Your refactored DATABAYT_I18N_STANDARD_V2.0 application will be available at:" -ForegroundColor Cyan
Write-Host "   📱 English: http://localhost:3000/en" -ForegroundColor White
Write-Host "   🇸🇦 Arabic:  http://localhost:3000/ar" -ForegroundColor White
Write-Host ""

# Try different approaches
try {
    & pnpm dev
} catch {
    Write-Host "❌ Standard dev command failed. Trying alternative..." -ForegroundColor Red
    try {
        & npx next dev --port 3003
    } catch {
        Write-Host "❌ Alternative dev command failed. Starting production build..." -ForegroundColor Red
        & pnpm build
        & pnpm start
    }
}