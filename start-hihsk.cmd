@echo off
setlocal
title HiHSK Local
cd /d "%~dp0"

rem Portable Node.js location used by this project (see PROJECT_MANUAL.md)
if exist "D:\nodejs\node.exe" set "PATH=%PATH%;D:\nodejs"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js or place it in D:\nodejs, then run this file again.
  pause
  exit /b 1
)

rem Private secret for login sessions (kept out of git by .gitignore)
if not exist ".env.local" (
  echo Creating .env.local with a private login secret...
  node -e "process.stdout.write('JWT_SECRET='+require('crypto').randomBytes(48).toString('hex')+'\n')" > .env.local
)

set "FRESH_DB="
if not exist "prisma\dev.db" set "FRESH_DB=1"

echo.
echo [1/3] Installing packages (npm install)...
call npm install --no-audit --no-fund
if errorlevel 1 goto fail

echo.
echo [2/3] Syncing the database schema (prisma db push)...
call npx prisma db push --skip-generate
if errorlevel 1 goto fail

if defined FRESH_DB (
  echo.
  echo New database: loading lessons, radicals and demo accounts...
  call npm run db:seed
  if errorlevel 1 goto fail
)

echo.
echo [3/3] Starting HiHSK at http://localhost:3000 ...
echo       Keep this window open while you use the app. Close it to stop the server.
echo.
call npm run dev
goto :eof

:fail
echo.
echo Something went wrong (see the messages above).
echo If you see "EPERM", close any other window running "npm run dev" and run this file again.
pause
exit /b 1
