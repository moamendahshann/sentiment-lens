@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Install Node.js 24 from https://nodejs.org
 pause
 exit /b 1
)
start "" "http://localhost:5180"
call npm.cmd start
pause
