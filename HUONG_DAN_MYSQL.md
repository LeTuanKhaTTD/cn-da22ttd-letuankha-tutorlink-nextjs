# 🔧 HƯỚNG DẪN KẾT NỐI MYSQL 8.0

## Cách 1: Import bằng MySQL Workbench (Dễ nhất)

### Bước 1: Mở MySQL Workbench
1. Tìm **MySQL Workbench** trong Start Menu
2. Click vào connection `Local instance MySQL80`
3. Nhập password

### Bước 2: Import Database
1. Click **File** → **Open SQL Script**
2. Chọn file: `D:\110122086_LTK\DOAN_CHUYENNGANG\database\tutorlink_complete.sql`
3. Click icon **⚡ Execute** (hoặc Ctrl+Shift+Enter)
4. Đợi chạy xong (khoảng 5-10 giây)

### Bước 3: Kiểm Tra
1. Refresh schemas (click icon refresh)
2. Thấy database `tutorlink_db` xuất hiện
3. Mở rộng → Thấy 8 bảng

---

## Cách 2: Import bằng Command Line

### Nếu bạn nhớ password:
```powershell
cd D:\110122086_LTK\DOAN_CHUYENNGANG
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < database\tutorlink_complete.sql
# Nhập password khi được hỏi
```

### Nếu quên password:
1. Xem file: `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`
2. Hoặc reset password MySQL (cần admin)

---

## Cách 3: Cập nhật .env với user khác (nếu có)

Nếu bạn có user MySQL khác (không phải root):

**File .env:**
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=tutorlink_db
```

---

## ✅ SAU KHI IMPORT XONG

### 1. Cập nhật file .env
File `.env` đã được update:
```env
DB_USER=root
DB_PASSWORD=TutorLink@2025
```

**⚠️ QUAN TRỌNG:** Thay `TutorLink@2025` bằng password MySQL 8.0 thật của bạn!

### 2. Kiểm tra kết nối
```bash
cd backend
node quick-check.js
```

Kết quả mong đợi:
```
✅ MySQL: Kết nối thành công
✅ Dữ liệu:
   👥 Người dùng: 21
   🎓 Gia sư: 20
   📢 Bài đăng: 5
```

### 3. Chạy project
```bash
npm run dev
```

---

## 🔑 Tài Khoản Test

**Admin:**
- Email: `admin@tutorlink.vn`
- Password: `giasu123`

**Gia sư (20 accounts):**
- Email: `1101210001@st.tvu.edu.vn` → `1101210020@st.tvu.edu.vn`
- Password: `123456`

---

## ❓ Nếu vẫn lỗi password

### Tìm password trong file cấu hình:
```powershell
Get-Content "C:\ProgramData\MySQL\MySQL Server 8.0\my.ini" | Select-String "password"
```

### Hoặc reset password (cần quyền admin):
1. Stop MySQL service
2. Start MySQL với `--skip-grant-tables`
3. Reset password
4. Restart MySQL

---

**Làm theo Cách 1 (MySQL Workbench) sẽ dễ nhất!**
