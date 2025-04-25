Write-Host "Starting ACKO Insurance Client..." -ForegroundColor Green
Write-Host ""

Set-Location -Path "client"
Write-Host "Current directory: $((Get-Location).Path)" -ForegroundColor Yellow
Write-Host "Starting client..." -ForegroundColor Cyan

# Set environment variables
$env:NODE_OPTIONS = "--openssl-legacy-provider"
$env:REACT_APP_API_URL = "http://localhost:8081"

# Start the client
npm start 
 