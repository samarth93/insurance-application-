@echo off
echo Starting ACKO Insurance Client...
echo.

cd client
npm install
echo.
echo Client dependencies installed. Starting client...
echo.
set NODE_OPTIONS=--openssl-legacy-provider
npm start 
 