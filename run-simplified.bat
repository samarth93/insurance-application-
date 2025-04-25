@echo off
echo Starting ACKO Insurance Application (Simplified)...
echo.

echo Starting simplified server...
cd server
start cmd /k "node start.js"

echo.
echo Waiting for server to initialize (3 seconds)...
timeout /t 3 /nobreak > nul

echo.
echo Starting client...
cd ..\client
set NODE_OPTIONS=--openssl-legacy-provider
start cmd /k "npm start"

echo.
echo Both applications are starting. Please wait for the browser to open.
echo Server: http://localhost:8081
echo Client: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul 
 