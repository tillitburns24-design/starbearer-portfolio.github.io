@echo off
setlocal

cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found on PATH.
  echo Reopen your terminal or install Node.js, then try again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Dependency install failed.
    pause
    exit /b 1
  )
)

echo Starting public-safe dev server...
start "Starbearer Public Dev Server" cmd /k "cd /d %~dp0 && npm run dev:public"

timeout /t 5 /nobreak >nul

echo Starting public tunnel...
start "Starbearer Public Link" cmd /k "cd /d %~dp0 && npm run share"

echo.
echo Local preview: http://localhost:3002
echo Public link window will print the live URL once ready.
echo Keep both windows open while you edit the site.
pause
