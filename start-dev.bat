@echo off
chcp 65001 >nul
echo 경희늘품한의원 개발 서버를 시작합니다...
echo.

cd /d "%~dp0"

echo Docker Compose로 서버를 시작합니다...
docker-compose -f docker-compose.dev.yml up --build

pause


