@echo off
chcp 65001 >nul
title TVHs-Labs-Video - Kiểm Tra Hệ Thống (Doctor)
echo ========================================================
echo   Đang kiểm tra môi trường và sức khỏe hệ thống...
echo ========================================================
cd /d "%~dp0engine"
npm run doctor
pause
