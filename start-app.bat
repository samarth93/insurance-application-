@echo off
echo Starting ACKO Insurance Application...
echo.

echo Starting server...
start cmd /k "cd server && npm start"

echo.
echo Waiting for server to initialize (5 seconds)...
timeout /t 5 /nobreak > nul

echo.
echo Starting client...
start cmd /k "cd client && npm start"

echo.
echo Both applications are starting. Please wait for the browser to open.
echo Server: http://localhost:8081
echo Client: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul 