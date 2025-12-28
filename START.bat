@echo off
chcp 65001 >nul
cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║           🚀 TUTORLINK TVU - KHỞI ĐỘNG ỨNG DỤNG             ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Buoc 1: Kiem tra Node.js
echo [Bước 1/5] Kiểm tra môi trường...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Lỗi: Chưa cài đặt Node.js!
    echo    Vui lòng cài Node.js từ: https://nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js: 
node --version
echo.

REM Buoc 2: Kill process cu
echo [Bước 2/5] Dọn dẹp process cũ...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul
echo ✅ Đã dọn dẹp process cũ
echo.

REM Buoc 3: Kiem tra dependencies
echo [Bước 3/5] Kiểm tra dependencies...
if not exist "node_modules\" (
    echo ⚠️  Chưa cài đặt dependencies. Đang cài đặt...
    call npm install
)
echo ✅ Dependencies đã sẵn sàng
echo.

REM Buoc 4: Khoi dong backend
echo [Bước 4/5] Khởi động Backend API (port 5000)...
start "🔧 Backend Server - TutorLink" cmd /k "title Backend Server ^& cd /d %~dp0 ^& echo. ^& echo ╔══════════════════════════════════════╗ ^& echo ║   BACKEND SERVER - PORT 5000          ║ ^& echo ╚══════════════════════════════════════╝ ^& echo. ^& npm run server"
timeout /t 3 /nobreak >nul
echo ✅ Backend đã khởi động
echo.

REM Buoc 5: Khoi dong frontend
echo [Bước 5/5] Khởi động Frontend (port 5173)...
start "⚛️  Frontend Vite - TutorLink" cmd /k "title Frontend Vite ^& cd /d %~dp0 ^& echo. ^& echo ╔══════════════════════════════════════╗ ^& echo ║   FRONTEND VITE - PORT 5173           ║ ^& echo ╚══════════════════════════════════════╝ ^& echo. ^& npm run dev:frontend"
timeout /t 8 /nobreak >nul
echo ✅ Frontend đã khởi động
echo.

REM Mo trinh duyet
echo 🌐 Đang mở trình duyệt...
timeout /t 2 /nobreak >nul
start http://localhost:3000
echo.

echo ╔══════════════════════════════════════════════════════════════╗
echo ║              ✅ KHỞI ĐỘNG THÀNH CÔNG!                       ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 📱 Backend API:  http://localhost:5000
echo 🌐 Frontend App: http://localhost:3000
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                   TÀI KHOẢN TEST                             ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║  👨‍🎓 Gia sư:                                                  ║
echo ║     Email:    1101210001@st.tvu.edu.vn                       ║
echo ║     Password: giasu123                                       ║
echo ║                                                              ║
echo ║  👪 Phụ huynh:                                                ║
echo ║     Đăng ký mới tại trang web (tab "Đăng ký")               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 💡 Mẹo: 
echo    - Đừng đóng 2 cửa sổ cmd (Backend và Frontend)
echo    - Nhấn Ctrl+C trong cửa sổ cmd để dừng server
echo    - Kiểm tra logs trong 2 cửa sổ cmd nếu có lỗi
echo.
echo Nhấn phím bất kỳ để đóng cửa sổ này...
pause >nul
