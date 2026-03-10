# 경희늘품한의원 개발 서버 실행 스크립트
Write-Host "경희늘품한의원 개발 서버를 시작합니다..." -ForegroundColor Green

# 현재 디렉토리 확인
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Docker Compose로 실행
Write-Host "`nDocker Compose로 서버를 시작합니다..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up --build


