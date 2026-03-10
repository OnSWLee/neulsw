@echo off
chcp 65001 >nul
echo ========================================
echo 경희늘품한의원 개발 서버 실행
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] 백엔드 서버를 시작합니다...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 2 /nobreak >nul

echo [2/2] 프론트엔드 서버를 시작합니다...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo 서버가 시작되었습니다!
echo.
echo 백엔드: http://localhost:3000
echo 프론트엔드: http://localhost:5173
echo ========================================
echo.
echo 서버를 종료하려면 각 창을 닫으세요.
pause





