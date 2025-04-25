Write-Host "Starting ACKO Insurance Backup Server..." -ForegroundColor Yellow
Write-Host "This is a simplified version with mock data for testing" -ForegroundColor Yellow
Write-Host ""

Set-Location -Path "server"
Write-Host "Current directory: $((Get-Location).Path)" -ForegroundColor Cyan
Write-Host "Starting backup server..." -ForegroundColor Cyan

# Set environment variables
$env:PORT = 8081
$env:NODE_ENV = "development"

# Start the backup server
node backup-server.js 
 