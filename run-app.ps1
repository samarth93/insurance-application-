Write-Host "Starting ACKO Insurance Application..." -ForegroundColor Green
Write-Host ""

# Get the current directory
$mainDir = Get-Location

# Start the server in a new window
Write-Host "Starting server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$mainDir'; .\run-server.ps1"

# Wait a few seconds for the server to start
Write-Host "Waiting for server to initialize (5 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start the client in a new window
Write-Host "Starting client..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$mainDir'; .\run-client.ps1"

Write-Host ""
Write-Host "Both applications are starting. Please wait for the browser to open." -ForegroundColor Green
Write-Host "Server: http://localhost:8081" -ForegroundColor Magenta
Write-Host "Client: http://localhost:3000" -ForegroundColor Magenta
Write-Host "" 
 