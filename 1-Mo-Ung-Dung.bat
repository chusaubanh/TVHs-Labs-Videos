@echo off
chcp 65001 >nul
title TVHs-Labs-Video - Mở Ứng Dụng Web Studio
echo ========================================================
echo   Đang khởi động TVHs-Labs-Video Web Studio...
echo ========================================================
cd /d "%~dp0engine"
npm run app
pause
