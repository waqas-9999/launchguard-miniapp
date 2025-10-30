@echo off
cd backend
start "Backend Server" cmd /k "node server.js"
start "Backend Ngrok" cmd /k "ngrok http 5000"
echo.
echo ✅ Backend server and ngrok tunnel started!
echo.
echo Check the ngrok terminal for your new URL
echo Then update backend/server.js with the new ngrok URL
pause
