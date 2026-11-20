@echo off
chcp 65001 >nul
title TVHs-Labs-Video - Xuất Video Thành Phẩm (Render)
echo ========================================================
echo   Nhập tên tài liệu trong thư mục input để xuất video
echo   (Ví dụ: "Bài Viết AI\Bài 5" hoặc "Pha-tra")
echo ========================================================
set /p docname="Tên tài liệu: "
if "%docname%"=="" (
    echo Vui lòng nhập tên tài liệu hợp lệ!
    pause
    exit /b 1
)
cd /d "%~dp0engine"
npm run render -- "%docname%"
pause
