@echo off
REM Automated service health check script for Windows
setlocal enabledelayedexpansion

echo ===============================================
echo    Testing FastAPI + React + SQLPage Services
echo ===============================================
echo.

set total=0
set passed=0

echo [DOCKER CONTAINERS]
echo --------------------

REM Check Docker containers
for %%c in (nginx postgres redis backend worker flower frontend sqlpage pgadmin) do (
    set /a total+=1
    echo | set /p dummy="Checking %%c container... "
    docker-compose ps | findstr /i "%%c.*Up" >nul 2>&1
    if !errorlevel! equ 0 (
        echo [32m PASS[0m
        set /a passed+=1
    ) else (
        echo [31m FAIL[0m
    )
)

echo.
echo [HTTP ENDPOINTS]
echo ----------------

REM Test HTTP endpoints using curl (if available) or PowerShell
where curl >nul 2>&1
if %errorlevel% equ 0 (
    REM Use curl
    set /a total+=1
    echo | set /p dummy="Testing Frontend... "
    curl -s -o nul -w "%%{http_code}" http://localhost:8000 | findstr "200" >nul && (
        echo [32m PASS[0m
        set /a passed+=1
    ) || echo [31m FAIL[0m

    set /a total+=1
    echo | set /p dummy="Testing API Root... "
    curl -s -o nul -w "%%{http_code}" http://localhost:8000/api/v1 | findstr "200" >nul && (
        echo [32m PASS[0m
        set /a passed+=1
    ) || echo [31m FAIL[0m

    set /a total+=1
    echo | set /p dummy="Testing API Docs... "
    curl -s -o nul -w "%%{http_code}" http://localhost:8000/api/docs | findstr "200" >nul && (
        echo [32m PASS[0m
        set /a passed+=1
    ) || echo [31m FAIL[0m

    set /a total+=1
    echo | set /p dummy="Testing SQLPage... "
    curl -s -o nul -w "%%{http_code}" http://localhost:8000/sqlpage/ | findstr "200" >nul && (
        echo [32m PASS[0m
        set /a passed+=1
    ) || echo [31m FAIL[0m

    set /a total+=1
    echo | set /p dummy="Testing Flower... "
    curl -s -o nul -w "%%{http_code}" http://localhost:5555 | findstr "200" >nul && (
        echo [32m PASS[0m
        set /a passed+=1
    ) || echo [31m FAIL[0m
) else (
    echo curl not found, skipping HTTP tests
    echo Install curl or test manually in browser
)

echo.
echo [DATABASE CONNECTION]
echo --------------------

set /a total+=1
echo | set /p dummy="Testing PostgreSQL... "
docker-compose exec -T backend python -c "from app.db.session import SessionLocal; db = SessionLocal(); print('Connected')" 2>nul | findstr "Connected" >nul 2>&1
if !errorlevel! equ 0 (
    echo [32m PASS[0m
    set /a passed+=1
) else (
    echo [31m FAIL[0m
)

echo.
echo ===================
echo       RESULTS
echo ===================
echo Total Tests: !total!
echo Passed: !passed!
set /a failed=!total!-!passed!
echo Failed: !failed!
echo.

if !passed! equ !total! (
    echo [32mAll tests passed![0m
    exit /b 0
) else (
    echo [33mSome tests failed. Check logs with: docker-compose logs[0m
    exit /b 1
)
