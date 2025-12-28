# ✅ CHECKLIST - TRƯỚC KHI NỘP BÁO CÁO

> **Danh sách kiểm tra cuối cùng trước khi demo/nộp đồ án**

---

## 📋 BƯỚC 1: CHUẨN BỊ DATABASE

### ✅ Import Database
```bash
# 1. Mở XAMPP Control Panel
# 2. Start Apache + MySQL
# 3. Mở phpMyAdmin: http://localhost/phpmyadmin
# 4. Import file: database/tutorlink_complete.sql
```

**Kết quả mong đợi:**
- ✅ Database `tutorlink_db` được tạo
- ✅ 8 bảng: nguoi_dung, ho_so_sinh_vien, ho_so_gia_su, mon_hoc, gia_su_mon_hoc, bai_dang, don_ung_tuyen, danh_gia
- ✅ 21 users (1 admin + 20 tutors)
- ✅ 10 môn học
- ✅ 5 bài đăng mẫu

### ✅ Kiểm Tra Database
```bash
cd backend
node quick-check.js
```

**Output mong đợi:**
```
✅ MySQL: Kết nối thành công
✅ Dữ liệu:
   👥 Người dùng: 21
   🎓 Gia sư: 20
   📢 Bài đăng: 5
```

**❌ Nếu thấy "0 người dùng":** Chưa import database! Quay lại bước import.

---

## 📋 BƯỚC 2: KIỂM TRA CÁC FILE QUAN TRỌNG

### ✅ File Documentation
- [ ] `README.md` - Tài liệu chính (đã cập nhật)
- [ ] `HUONG_DAN_DAY_DU.md` - Hướng dẫn cài đặt đầy đủ
- [ ] `PROJECT_STRUCTURE.md` - Cấu trúc dự án chi tiết
- [ ] `backend/UTILITY_SCRIPTS.md` - Hướng dẫn scripts
- [ ] `docs/AUTH_API_GUIDE.md` - API documentation
- [ ] `docs/DASHBOARD_GUIDE.md` - Dashboard guide
- [ ] `docs/TEST_ACCOUNTS.md` - Tài khoản test

### ✅ File Configuration
- [ ] `.env` - Environment variables (đã cấu hình đúng)
- [ ] `package.json` - Dependencies đầy đủ
- [ ] `vite.config.ts` - Vite config
- [ ] `backend/config/database.js` - DB config

### ✅ Database Files
- [ ] `database/tutorlink_complete.sql` - File SQL duy nhất (quan trọng!)
- [ ] `database/README.md` - Hướng dẫn database

### ✅ Scripts
- [ ] `START.bat` - Quick start cho Windows
- [ ] `backend/quick-check.js` - Health check
- [ ] `backend/check-system.js` - System stats
- [ ] 6 utility scripts trong backend/

---

## 📋 BƯỚC 3: CHẠY THỬ DỰ ÁN

### ✅ Cách 1: START.bat (Đơn giản nhất)
```bash
# Double-click START.bat
# Hoặc:
.\START.bat
```

**Kết quả mong đợi:**
- ✅ Backend chạy tại: http://localhost:5000
- ✅ Frontend chạy tại: http://localhost:5173
- ✅ Trình duyệt tự động mở

### ✅ Cách 2: NPM Command
```bash
npm run dev
```

### ✅ Kiểm Tra Backend API
```bash
# Test trong terminal khác:
curl http://localhost:5000/api/auth/test

# Hoặc mở trình duyệt:
http://localhost:5000
```

**Kết quả mong đợi:** 
```json
{"message": "TutorLink API is running"}
```

---

## 📋 BƯỚC 4: TEST CÁC TÍNH NĂNG

### ✅ Test 1: Đăng Nhập Admin
1. Mở: http://localhost:5173/auth
2. Tab "Đăng nhập"
3. Email: `admin@tutorlink.vn`
4. Password: `giasu123`
5. Click "Đăng nhập"

**Kết quả:**
- ✅ Chuyển đến Admin Dashboard
- ✅ Thấy thống kê: 21 users, 20 tutors, 5 posts

### ✅ Test 2: Xem Danh Sách Gia Sư
1. Click "Tìm gia sư" trên navbar
2. Hoặc vào: http://localhost:5173/tutors

**Kết quả:**
- ✅ Thấy 20 gia sư
- ✅ Mỗi card có:
  - ✓ Badge xác thực
  - Tên, môn dạy, cấp độ
  - Học phí (đ/buổi)
  - Rating, kinh nghiệm
  - Khu vực

### ✅ Test 3: Lọc Gia Sư
1. Tại trang /tutors
2. Filter:
   - Môn học: Chọn "Toán"
   - Cấp độ: Chọn "THCS"
   - Khu vực: Chọn "Trà Vinh"

**Kết quả:**
- ✅ Danh sách lọc đúng môn Toán, cấp THCS

### ✅ Test 4: Xem Chi Tiết Gia Sư
1. Click vào 1 tutor card
2. Xem trang chi tiết

**Kết quả:**
- ✅ Thấy đầy đủ:
  - Thông tin cá nhân
  - MSSV, Mã lớp (nếu là sinh viên)
  - Môn dạy + cấp độ
  - Học phí, kinh nghiệm
  - Kỹ năng, giới thiệu

### ✅ Test 5: Đăng Nhập Gia Sư
1. Logout admin
2. Đăng nhập:
   - Email: `1101210001@st.tvu.edu.vn`
   - Password: `123456`

**Kết quả:**
- ✅ Chuyển đến Tutor Dashboard
- ✅ Thấy hồ sơ của mình
- ✅ Thấy các bài đăng có thể ứng tuyển

### ✅ Test 6: Đăng Ký Phụ Huynh Mới
1. Logout
2. Vào: http://localhost:5173/auth
3. Tab "Đăng ký"
4. Chọn "Phụ huynh"
5. Điền form:
   - Họ tên: Nguyễn Văn A
   - Email: parent@example.com
   - Password: 123456
   - SĐT: 0981234567

**Kết quả:**
- ✅ Đăng ký thành công
- ✅ Tự động đăng nhập
- ✅ Chuyển đến Parent Dashboard

### ✅ Test 7: Đăng Bài Tìm Gia Sư (Phụ Huynh)
1. Đăng nhập phụ huynh
2. Click "Đăng bài tìm gia sư"
3. Điền form:
   - Tiêu đề: "Cần gia sư Toán lớp 8"
   - Môn học: Toán
   - Cấp độ: THCS
   - Địa điểm: TP. Trà Vinh
   - Học phí: 150000
   - Mô tả: "Dạy 3 buổi/tuần"

**Kết quả:**
- ✅ Bài đăng được tạo
- ✅ Xuất hiện trong danh sách bài đăng

### ✅ Test 8: Ứng Tuyển (Gia Sư)
1. Logout, đăng nhập gia sư
2. Vào "Xem bài đăng" hoặc /posts
3. Click vào 1 bài đăng
4. Click "Ứng tuyển"
5. Viết lời nhắn

**Kết quả:**
- ✅ Đơn ứng tuyển được gửi
- ✅ Thông báo thành công
- ✅ Thấy đơn trong dashboard

---

## 📋 BƯỚC 5: KIỂM TRA RESPONSIVE

### ✅ Desktop (1920x1080)
- [ ] Navbar hiển thị đầy đủ menu
- [ ] Cards xếp 3-4 cột
- [ ] Footer đầy đủ thông tin

### ✅ Tablet (768px)
- [ ] Navbar chuyển sang hamburger menu
- [ ] Cards xếp 2 cột
- [ ] Sidebar filters thu gọn

### ✅ Mobile (375px)
- [ ] Cards xếp 1 cột
- [ ] Font size nhỏ hơn
- [ ] Touch-friendly buttons

**Cách test:** F12 → Toggle device toolbar → Chọn thiết bị

---

## 📋 BƯỚC 6: KIỂM TRA PERFORMANCE

### ✅ Load Time
```bash
# Trong browser DevTools → Network tab
# Reload page (Ctrl+R)
```

**Kết quả mong đợi:**
- ✅ Initial load < 3 seconds
- ✅ API calls < 500ms
- ✅ No 404 errors

### ✅ Database Query
```bash
cd backend
node check-system.js
```

**Kiểm tra:**
- ✅ Queries execute nhanh (< 100ms)
- ✅ No connection errors
- ✅ Data integrity (số liệu khớp)

---

## 📋 BƯỚC 7: CHUẨN BỊ DEMO

### ✅ Tài Khoản Demo
Ghi ra giấy hoặc slide:

**Admin:**
```
Email: admin@tutorlink.vn
Password: giasu123
```

**Gia sư 1:**
```
Email: 1101210001@st.tvu.edu.vn
Password: 123456
Tên: Nguyễn Văn An
Môn: Toán, THCS + THPT
```

**Gia sư 2:**
```
Email: 1101210005@st.tvu.edu.vn
Password: 123456
Tên: Trần Thị Bích
Môn: Toán, Tiểu học + THCS + THPT
```

### ✅ Kịch Bản Demo (5-10 phút)

**Phần 1: Giới thiệu (1 phút)**
- Mục đích: Kết nối gia sư sinh viên TVU với phụ huynh
- 2 loại user: Phụ huynh (đơn giản) + Gia sư (cần MSSV)

**Phần 2: Demo Tìm Gia Sư (2 phút)**
1. Vào trang chủ
2. Click "Tìm gia sư"
3. Lọc theo môn, cấp độ
4. Click vào 1 gia sư → Xem hồ sơ chi tiết
5. Chỉ badge xác thực ✓

**Phần 3: Demo Đăng Ký Gia Sư (2 phút)**
1. Click "Đăng ký"
2. Chọn tab "Gia sư"
3. Show form 4 bước:
   - Thông tin cơ bản
   - Thông tin sinh viên (MSSV, mã lớp)
   - Hồ sơ gia sư (môn dạy, học phí)
   - Xác nhận
4. Submit → Chờ admin duyệt

**Phần 4: Demo Admin (2 phút)**
1. Đăng nhập admin
2. Show dashboard:
   - Thống kê tổng quan
   - Danh sách users
   - Danh sách gia sư
3. Click "Xác thực" gia sư
4. Show gia sư đã được verified

**Phần 5: Demo Ứng Tuyển (2 phút)**
1. Đăng nhập phụ huynh
2. Đăng bài tìm gia sư
3. Logout, đăng nhập gia sư
4. Ứng tuyển bài đăng
5. Logout, đăng nhập phụ huynh
6. Chấp nhận đơn ứng tuyển

**Phần 6: Kết luận (1 phút)**
- Đã hoàn thành: Full-stack (React + Node + MySQL)
- Tính năng chính: Auth, CRUD, Filter, Role-based
- Hướng phát triển: Chat real-time, Email, Mobile app

---

## 📋 BƯỚC 8: FILE NỘP CHO GIẢNG VIÊN

### ✅ Cấu Trúc Thư Mục Nộp
```
DOAN_TUTORLINK_110122086/
├── Source_Code/
│   └── DOAN_CHUYENNGANG/  (Full source)
│
├── Database/
│   └── tutorlink_complete.sql
│
├── Documents/
│   ├── README.md
│   ├── HUONG_DAN_DAY_DU.md
│   ├── PROJECT_STRUCTURE.md
│   ├── ARCHITECTURE.md
│   └── Đề cương chi tiết.docx
│
└── Video_Demo.mp4  (nếu có)
```

### ✅ File ZIP
```bash
# Tạo file ZIP (loại trừ node_modules, dist)
# Tên file: DOAN_110122086_LetuanKha.zip
```

**Lưu ý:**
- ❌ KHÔNG nén `node_modules/` (quá nặng)
- ❌ KHÔNG nén `dist/`, `.git/`
- ✅ Nén toàn bộ source + docs + SQL
- ✅ File README.md ở root để giảng viên đọc đầu tiên

---

## 📋 BƯỚC 9: BACKUP

### ✅ Backup Code
```bash
# Copy toàn bộ thư mục sang ổ khác
# Hoặc push lên GitHub (private repo)
```

### ✅ Backup Database
```bash
# Trong phpMyAdmin:
# Database "tutorlink_db" → Export → SQL
# Lưu file backup: tutorlink_backup_YYYYMMDD.sql
```

### ✅ Backup Documents
```bash
# Copy tất cả .md, .docx vào Google Drive/OneDrive
```

---

## 📋 BƯỚC 10: TRẢ LỜI CÂU HỎI THƯỜNG GẶP

### ❓ "Tại sao không dùng framework CSS?"
✅ **Trả lời:** Để hiểu rõ CSS fundamentals và tùy chỉnh hoàn toàn design theo yêu cầu đồ án. Custom CSS giúp performance tốt hơn (không load code thừa).

### ❓ "Làm sao xác thực MSSV sinh viên?"
✅ **Trả lời:** Admin xác thực thủ công bằng cách check MSSV trong hệ thống trường. Có thể tích hợp API trường sau này.

### ❓ "Vì sao dùng MySQL thay vì MongoDB?"
✅ **Trả lời:** Dữ liệu có quan hệ rõ ràng (user → tutor → post → application). MySQL phù hợp với relational data và JOIN queries.

### ❓ "Có xử lý bảo mật không?"
✅ **Trả lời:** 
- Password hash bằng bcrypt
- JWT cho authentication
- CORS config đúng origin
- SQL injection prevention (parameterized queries)
- XSS prevention (React auto-escaping)

### ❓ "Scalability như thế nào?"
✅ **Trả lời:**
- Database: Có indexes trên foreign keys
- Backend: Stateless API, có thể scale horizontal
- Frontend: Static files, CDN ready
- Pagination để handle large datasets

---

## ✅ CHECKLIST CUỐI CÙNG

### Trước khi demo:
- [ ] Database đã import (21 users, 20 tutors)
- [ ] Backend đang chạy (port 5000)
- [ ] Frontend đang chạy (port 5173)
- [ ] Đã test 8 kịch bản trên
- [ ] Tài khoản demo đã chuẩn bị
- [ ] Browser DevTools đóng (trông professional hơn)
- [ ] Màn hình sạch sẽ (đóng tabs không cần thiết)

### Trước khi nộp:
- [ ] Code đã format (Prettier)
- [ ] No console.log debug statements
- [ ] No commented code blocks
- [ ] All documentation files complete
- [ ] README.md rõ ràng
- [ ] .env.example có đầy đủ variables
- [ ] File ZIP < 50MB (không có node_modules)

### Sau khi nộp:
- [ ] Backup code lên GitHub/GitLab
- [ ] Backup database SQL file
- [ ] Lưu video demo (nếu có)
- [ ] Ghi chép feedback từ giảng viên

---

## 🎉 CHÚC MỪNG!

Bạn đã hoàn thành đồ án chuyên ngành TutorLink TVU!

**Điểm mạnh của dự án:**
- ✅ Full-stack hoàn chỉnh (Frontend + Backend + Database)
- ✅ Authentication & Authorization (Role-based)
- ✅ CRUD operations đầy đủ
- ✅ UI/UX sạch sẽ, professional
- ✅ Code structure tốt, dễ maintain
- ✅ Documentation đầy đủ
- ✅ Real-world use case (có giá trị thực tế)

**Good luck với presentation! 🚀**

---

<div align="center">

**Made with ❤️ by Lê Tuấn Khá - 110122086**

*Trường Đại học Trà Vinh*

</div>
