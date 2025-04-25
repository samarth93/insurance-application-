Write-Host "Starting ACKO Insurance Server..." -ForegroundColor Green
Write-Host ""

Set-Location -Path "server"
Write-Host "Current directory: $((Get-Location).Path)" -ForegroundColor Yellow
Write-Host "Starting server..." -ForegroundColor Cyan

# Set environment variables
$env:PORT = 8081
$env:NODE_ENV = "development"

# Start the server
node src/server.js 
 