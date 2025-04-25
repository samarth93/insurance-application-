@echo off
echo Starting ACKO Insurance Application...
echo.

echo Installing server dependencies...
cd server && npm install
if %ERRORLEVEL% NEQ 0 (
  echo Error installing server dependencies!
  pause
  exit /b 1
)

echo Installing client dependencies...
cd ..\client && npm install
if %ERRORLEVEL% NEQ 0 (
  echo Error installing client dependencies!
  pause
  exit /b 1
)

echo.
echo Starting server...
cd ..\server && start cmd /k "npm start"

echo.
echo Waiting for server to initialize (8 seconds)...
timeout /t 8 /nobreak > nul

echo.
echo Starting client...
cd ..\client && start cmd /k "npm start"

echo.
echo Both applications are starting. Please wait for the browser to open.
echo Server: http://localhost:8081
echo Client: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul 