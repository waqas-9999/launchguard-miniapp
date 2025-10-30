@echo off
start "Frontend Dev Server" cmd /k "npm run dev"
timeout /t 5
start "Frontend Ngrok" cmd /k "ngrok http 5173"
echo.
echo ✅ Frontend dev server and ngrok tunnel started!
echo.
echo Check the ngrok terminal for your new URL
echo Then update src/views/Dino.jsx with the new ngrok URL
pause
