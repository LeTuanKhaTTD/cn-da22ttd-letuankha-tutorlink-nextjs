# 🎓 Hệ thống Kết nối Gia sư - Trường ĐH Trà Vinh

## 📋 Giới thiệu

Nền tảng kết nối sinh viên TVU (làm gia sư) với phụ huynh/học sinh cần tìm gia sư.

## 🔐 Phạm vi & Yêu cầu

### ✅ GIA SƯ (Bắt buộc là sinh viên TVU)

**Yêu cầu đăng ký:**
- ✔️ Email hợp lệ
- ✔️ Mật khẩu (tối thiểu 6 ký tự)
- ✔️ **Mã số sinh viên (MSSV)** - 9 chữ số (VD: 110122086)
- ✔️ **Mã lớp** (VD: DH21IT02, DH22EN01)
- ✔️ Khoa, Ngành học, Năm học
- ✔️ **Ảnh đại diện** (avatar)
- ✔️ Thông tin gia sư (môn học, kinh nghiệm, học phí)

**Quy trình xác thực:**
1. Sinh viên đăng ký với MSSV
2. Admin xác thực MSSV trong vòng 24-48h
3. Sau khi xác thực → Hồ sơ được phê duyệt
4. Gia sư có thể nhận yêu cầu từ phụ huynh

### ✅ PHỤ HUYNH (Không yêu cầu MSSV)

**Yêu cầu đăng ký:**
- ✔️ Email hợp lệ
- ✔️ Mật khẩu
- ✔️ Họ tên, số điện thoại
- ✔️ **KHÔNG** cần MSSV

**Quyền hạn:**
- Tìm kiếm gia sư TVU đã xác thực
- Đăng bài tuyển gia sư
- Gửi lời mời đến gia sư
- Nhắn tin với gia sư

## 🎯 Lợi ích

### Cho Gia sư (Sinh viên TVU):
- ✨ Kiếm thu nhập thêm
- ✨ Tích lũy kinh nghiệm giảng dạy
- ✨ Badge xác thực "Sinh viên TVU" tạo uy tín
- ✨ Hệ thống quản lý lịch dạy

### Cho Phụ huynh:
- ✨ Tìm gia sư sinh viên TVU uy tín
- ✨ Xem MSSV, mã lớp để xác thực
- ✨ Đánh giá và review sau khóa học
- ✨ Liên hệ trực tiếp qua platform

## 🗂️ Cấu trúc Database

### Bảng `student_profiles` (Chỉ cho Gia sư)
```sql
CREATE TABLE student_profiles (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  student_id VARCHAR(9) NOT NULL UNIQUE,  -- MSSV (BẮT BUỘC)
  class_code VARCHAR(20) NOT NULL,        -- Mã lớp (BẮT BUỘC)
  faculty VARCHAR(100) NOT NULL,          -- Khoa
  major VARCHAR(100) NOT NULL,            -- Ngành học
  academic_year VARCHAR(20) NOT NULL,     -- VD: 2021-2025
  verified BOOLEAN DEFAULT FALSE,         -- Đã xác thực bởi admin
  verified_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Bảng `tutors` (Liên kết với student_profiles)
```sql
CREATE TABLE tutors (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  student_profile_id VARCHAR(36) NOT NULL,  -- BẮT BUỘC link với student_profiles
  avatar VARCHAR(255) NOT NULL,             -- URL ảnh đại diện (BẮT BUỘC)
  subjects JSON NOT NULL,                   -- ["Toán", "Lý"]
  levels JSON NOT NULL,                     -- ["THCS", "THPT"]
  rate VARCHAR(50),
  bio TEXT,
  experience VARCHAR(50),
  mode ENUM('Online', 'Offline', 'Kết hợp'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (student_profile_id) REFERENCES student_profiles(id)
);
```

## 🔒 Bảo mật

- 🔐 MSSV được mã hóa trong database
- 🔐 Admin xác thực MSSV bằng cách đối chiếu với hệ thống TVU
- 🔐 Password hash với bcrypt (10 rounds)
- 🔐 JWT token cho authentication
- 🔐 Avatar upload qua Cloudinary (có resize & crop)

## 📱 Tính năng chính

### 1. Đăng ký Gia sư (Multi-step Form)
- **Bước 1**: Tài khoản (Email, Password)
- **Bước 2**: Thông tin sinh viên (MSSV, Mã lớp, Khoa, Ngành)
- **Bước 3**: Upload ảnh đại diện
- **Bước 4**: Thông tin gia sư (Môn học, Kinh nghiệm, Học phí)

### 2. Tìm kiếm Gia sư
- Lọc theo môn học
- Lọc theo cấp độ
- Lọc theo khoa/ngành
- Lọc theo giá
- Chỉ hiển thị gia sư đã xác thực MSSV

### 3. Admin Panel
- Xem danh sách gia sư chờ xác thực
- Xác thực MSSV
- Quản lý users
- Thống kê

### 4. Badge Xác thực
- Icon ✓ màu xanh bên cạnh tên gia sư
- Hiển thị "MSSV: 110122086 • DH21IT02"
- Tooltip: "Sinh viên TVU đã xác thực"

## 🎨 Design System

### Màu sắc chính:
- **TVU Blue**: `#1d4ed8` (Primary)
- **Sky Blue**: `#0ea5e9` (Accent)
- **Yellow**: `#fbbf24` (Rating)
- **Success**: `#10b981` (Verified)
- **Warning**: `#f59e0b` (Pending)

### Typography:
- **Font**: Inter (Google Fonts)
- **Heading**: 700 weight
- **Body**: 400-500 weight

## 🚀 Quy trình sử dụng

### Cho Sinh viên TVU (muốn làm gia sư):
1. Đăng ký tài khoản với MSSV
2. Upload avatar
3. Điền thông tin gia sư
4. Chờ admin xác thực MSSV (24-48h)
5. Nhận email phê duyệt
6. Bắt đầu nhận yêu cầu từ phụ huynh

### Cho Phụ huynh:
1. Đăng ký tài khoản (không cần MSSV)
2. Tìm kiếm gia sư theo nhu cầu
3. Xem profile (có MSSV để kiểm tra)
4. Gửi lời mời/nhắn tin
5. Thỏa thuận lịch học
6. Đánh giá sau khóa học

## 📊 Thống kê mẫu

Hiện có **5 gia sư mẫu** từ các khoa:
- **Khoa Sư phạm**: 2 gia sư (Toán, Tiếng Anh)
- **Khoa Kỹ thuật và Công nghệ**: 1 gia sư (CNTT)
- **Khoa Kinh tế**: 2 gia sư (Kế toán, QTKD)

Tất cả đều:
- ✅ Có MSSV hợp lệ
- ✅ Đã xác thực bởi admin
- ✅ Có ảnh đại diện
- ✅ Có badge xác thực

## 🛠️ Tech Stack

### Frontend:
- React 19 + TypeScript
- Vite
- CSS3 (Custom properties)

### Backend (Planned):
- Node.js + Express
- MySQL 8.0
- JWT Authentication
- Multer (File upload)
- Cloudinary (Image hosting)

## 📝 TODO

- [ ] API Backend cho MSSV verification
- [ ] Admin dashboard
- [ ] Real-time messaging
- [ ] Email notifications
- [ ] Payment integration (optional)
- [ ] Mobile app (React Native)

## 👥 Liên hệ

Dự án được phát triển cho Trường Đại học Trà Vinh
