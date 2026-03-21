@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js and npm are not available in this terminal yet.
  echo Close and reopen Codex or your terminal, then try again.
  echo If that still fails, restart Windows once so the PATH refreshes.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

echo Building the portfolio...
call npm run build
if errorlevel 1 (
  echo Build failed.
  pause
  exit /b 1
)

start "" cmd /c "ping 127.0.0.1 -n 4 >nul && start http://localhost:4173"
call npm run preview -- --host 127.0.0.1
