# 📖 HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY DỰ ÁN TUTORLINK

> **Hệ thống kết nối gia sư sinh viên TVU - Đồ án chuyên ngành**
> 
> Dự án này bao gồm Frontend (React + TypeScript) và Backend (Node.js + Express + MySQL)

---

## 📋 YÊU CẦU HỆ THỐNG

### Phần mềm cần cài đặt:

1. **Node.js** (v18 trở lên)
   - Download: https://nodejs.org/
   - Kiểm tra: `node --version`

2. **XAMPP** (hoặc WAMP/MAMP)
   - Download: https://www.apachefriends.org/
   - Cần: MySQL (port 3306)

3. **Git** (nếu clone từ repository)
   - Download: https://git-scm.com/

4. **VS Code** (khuyến nghị)
   - Download: https://code.visualstudio.com/

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT

### Bước 1: Chuẩn bị Database

1. **Mở XAMPP Control Panel**
   - Start **Apache**
   - Start **MySQL**

2. **Mở phpMyAdmin**
   - Truy cập: `http://localhost/phpmyadmin`
   - Click tab **SQL**

3. **Import Database**
   - Click **Choose File**
   - Chọn file: `database/tutorlink_complete.sql`
   - Click **Go**
   - Đợi import hoàn tất (tạo database + 20 gia sư + dữ liệu mẫu)

✅ **Kết quả:** Database `tutorlink_db` đã được tạo với đầy đủ dữ liệu

---

### Bước 2: Cài đặt Dependencies

Mở **Terminal** (hoặc Command Prompt) tại thư mục dự án:

```bash
# Cài đặt packages cho toàn bộ dự án
npm install
```

✅ Đợi cài đặt hoàn tất (khoảng 2-3 phút)

---

### Bước 3: Cấu hình môi trường

1. Kiểm tra file `.env` trong thư mục gốc:

```env
# MySQL Database (XAMPP mặc định)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tutorlink_db
DB_CHARSET=utf8mb4

# Backend Port
PORT=5000

# JWT Secret
JWT_SECRET=tutorlink_tvu_secret_key_2025
JWT_EXPIRES_IN=7d

# Frontend URL (CORS)
CORS_ORIGIN=http://localhost:5173
```

2. **Nếu MySQL của bạn có password**, sửa dòng:
   ```env
   DB_PASSWORD=your_mysql_password
   ```

---

### Bước 4: Kiểm tra kết nối Database

```bash
cd backend
node quick-check.js
```

**Kết quả mong đợi:**
```
✅ MySQL: Kết nối thành công
✅ Dữ liệu:
   👥 Người dùng: 21
   🎓 Gia sư: 20
   📢 Bài đăng: 5
```

❌ **Nếu lỗi "Cannot connect":**
- Kiểm tra MySQL đã chạy trong XAMPP
- Kiểm tra thông tin DB trong `.env`
- Kiểm tra port 3306 có bị chiếm không

---

## 🎯 CHẠY DỰ ÁN

### Option 1: Chạy cả Frontend + Backend (Khuyến nghị)

Mở **2 terminal** riêng biệt:

**Terminal 1 - Backend:**
```bash
npm run server
```
- Backend chạy tại: `http://localhost:5000`
- Xem log: "✅ Server đang chạy tại port 5000"

**Terminal 2 - Frontend:**
```bash
npm run dev
```
- Frontend chạy tại: `http://localhost:5173`
- Tự động mở trình duyệt

---

### Option 2: File START.bat (Windows)

Click đúp vào file `START.bat` trong thư mục gốc.

File này sẽ tự động:
1. Mở backend server
2. Mở frontend dev server
3. Mở trình duyệt tại `http://localhost:5173`

---

## 👤 TÀI KHOẢN TEST

### Admin:
- Email: `admin@tutorlink.vn`
- Password: `giasu123`

### Gia sư (20 tài khoản):
- Email: `1101210001@st.tvu.edu.vn` → `1101210020@st.tvu.edu.vn`
- Password: `123456` (tất cả)

**Ví dụ:**
- Email: `1101210001@st.tvu.edu.vn`
- Password: `123456`

---

## 📂 CẤU TRÚC DỰ ÁN

```
TUTORLINK/
├── backend/               # Backend API (Node.js + Express)
│   ├── config/           # Cấu hình database
│   ├── controllers/      # Business logic
│   ├── middleware/       # Authentication middleware
│   ├── routes/           # API routes
│   └── server.js         # Entry point
│
├── database/             # SQL files
│   └── tutorlink_complete.sql   # Database hoàn chỉnh (QUAN TRỌNG)
│
├── src/                  # Frontend source (React + TypeScript)
│   ├── api/             # API client
│   ├── components/      # React components
│   ├── pages/           # Pages/Views
│   ├── contexts/        # React Context (Auth, etc)
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utilities
│   └── types/           # TypeScript types
│
├── docs/                # Documentation
├── .env                 # Environment variables (Quan trọng!)
├── package.json         # Dependencies
└── vite.config.ts       # Vite config
```

---

## 🔧 CÁC LỆNH HỮU ÍCH

### Development:
```bash
# Frontend (React)
npm run dev              # Chạy dev server với hot-reload

# Backend (Node.js)
npm run server           # Chạy backend server
npm run server:dev       # Chạy với nodemon (auto-reload)
```

### Build Production:
```bash
npm run build            # Build frontend cho production
npm run preview          # Preview production build
```

### Database Scripts:
```bash
cd backend

# Kiểm tra nhanh
node quick-check.js

# Xem chi tiết dữ liệu
node check-system.js

# Xem cấu trúc bảng
node check-tables.js

# Xóa toàn bộ data (giữ admin)
node clear-all-data.js

# Tạo dữ liệu demo
node auto-setup-complete.js
```

---

## ❓ XỬ LÝ LỖI THƯỜNG GẶP

### 1. "Cannot connect to MySQL"
**Nguyên nhân:** MySQL chưa chạy
**Giải pháp:**
- Mở XAMPP Control Panel
- Click **Start** bên cạnh MySQL
- Chờ đến khi chữ "MySQL" có nền xanh lá

### 2. "Port 5173 is already in use"
**Nguyên nhân:** Port đã được dùng bởi app khác
**Giải pháp:**
- Tắt ứng dụng đang dùng port đó
- Hoặc sửa port trong `vite.config.ts`

### 3. "Port 5000 is already in use"
**Nguyên nhân:** Backend port bị chiếm
**Giải pháp:**
- Sửa `PORT=5001` trong `.env`
- Hoặc tắt app đang dùng port 5000

### 4. "Database 'tutorlink_db' không tồn tại"
**Nguyên nhân:** Chưa import database
**Giải pháp:**
- Mở phpMyAdmin (`http://localhost/phpmyadmin`)
- Import file `database/tutorlink_complete.sql`

### 5. "JWT secret is not defined"
**Nguyên nhân:** File `.env` không đúng
**Giải pháp:**
- Copy nội dung từ `.env.example`
- Paste vào `.env`
- Lưu file

### 6. Lỗi encoding (hiển thị ký tự lạ)
**Giải pháp:**
- Kiểm tra charset trong phpMyAdmin: phải là `utf8mb4_unicode_ci`
- Chạy lại `node quick-check.js` để test

---

## 📊 KIỂM TRA DỮ LIỆU

Sau khi import database, kiểm tra:

```bash
cd backend
node check-system.js
```

**Kết quả mong đợi:**
- ✅ 21 người dùng (1 admin + 20 gia sư)
- ✅ 20 hồ sơ gia sư
- ✅ 10 môn học (Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa, Tin, GDCD)
- ✅ 5 bài đăng mẫu
- ✅ Mỗi môn có 2 gia sư

---

## 📧 LIÊN HỆ & HỖ TRỢ

**Sinh viên thực hiện:** [Tên của bạn]
**MSSV:** 110122086
**Email:** [Email của bạn]

**Giảng viên hướng dẫn:** [Tên GVHD]

---

## 📝 GHI CHÚ

- Database sử dụng charset **UTF-8** (utf8mb4) để hỗ trợ tiếng Việt đầy đủ
- Tất cả password đều được hash bằng **bcrypt**
- Frontend sử dụng **Vite** (nhanh hơn CRA)
- Backend API theo chuẩn **RESTful**
- Authentication bằng **JWT**

---

## 🎓 CHỨC NĂNG CHÍNH

### Dành cho Phụ huynh:
- ✅ Đăng bài tìm gia sư
- ✅ Xem danh sách gia sư
- ✅ Xem hồ sơ gia sư chi tiết
- ✅ Nhận đơn ứng tuyển
- ✅ Chấp nhận/Từ chối đơn
- ✅ Đánh giá gia sư

### Dành cho Gia sư:
- ✅ Đăng ký hồ sơ (xác thực sinh viên TVU)
- ✅ Xem danh sách bài đăng
- ✅ Ứng tuyển bài đăng
- ✅ Quản lý đơn ứng tuyển
- ✅ Xem đánh giá của mình

### Dành cho Admin:
- ✅ Quản lý người dùng
- ✅ Thống kê hệ thống
- ✅ Duyệt hồ sơ gia sư
- ✅ Quản lý bài đăng

---

**Chúc bạn demo thành công! 🎉**
