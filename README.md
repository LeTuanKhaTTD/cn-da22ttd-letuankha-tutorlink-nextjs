<div align="center">
  
  # 🎓 TutorLink TVU - Hệ Thống Kết Nối Gia Sư
  
  ### Nền tảng kết nối sinh viên Đại học Trà Vinh với phụ huynh tìm gia sư
  
  [![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  
  **Đồ án chuyên ngành - Trường Đại học Trà Vinh**
</div>

---

## 📋 Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Tính Năng](#-tính-năng)
- [Demo & Screenshots](#-demo--screenshots)
- [Công Nghệ](#️-công-nghệ-sử-dụng)
- [Cài Đặt](#-cài-đặt)
- [Sử Dụng](#-sử-dụng)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Path Aliases](#-path-aliases)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Đóng Góp](#-đóng-góp)
- [Tác Giả](#-tác-giả)
- [License](#-license)

---

## 🎯 Giới Thiệu

**TutorLink** là nền tảng kết nối sinh viên Đại học Trà Vinh (làm gia sư) với phụ huynh/học sinh có nhu cầu học thêm. Hệ thống giúp:

- 👨‍🎓 **Sinh viên TVU**: Kiếm thu nhập thêm, tích lũy kinh nghiệm giảng dạy
- 👪 **Phụ huynh**: Tìm gia sư uy tín, đã được xác thực bởi trường
- 🏫 **Trường TVU**: Tạo cơ hội việc làm cho sinh viên, tăng kết nối với cộng đồng

### 🔑 Điểm Nổi Bật

- ✅ **Xác thực MSSV**: Chỉ sinh viên TVU có MSSV hợp lệ mới được đăng ký
- ✅ **Badge xác thực**: Icon ✓ hiển thị gia sư đã xác thực
- ✅ **2 loại tài khoản**: Phụ huynh (đơn giản) và Gia sư (yêu cầu MSSV)
- ✅ **Tìm kiếm thông minh**: Lọc theo môn học, cấp độ, khu vực, học phí
- ✅ **Responsive**: Hoạt động mượt mà trên mọi thiết bị
- ✅ **Dữ liệu mẫu**: 20 gia sư, 10 môn học, đầy đủ để demo

---

## ✨ Tính Năng

### Cho Phụ Huynh 👪

- 🔍 **Tìm kiếm gia sư** theo môn học, cấp độ (Tiểu học/THCS/THPT), khu vực
- 📋 **Đăng bài tuyển gia sư** với yêu cầu cụ thể
- 👀 **Xem hồ sơ chi tiết** gia sư (MSSV, mã lớp, kinh nghiệm)
- 📝 **Nhận đơn ứng tuyển** từ gia sư
- ✅ **Chấp nhận/Từ chối** đơn ứng tuyển
- ⭐ **Đánh giá gia sư** sau khi hoàn thành

### Cho Gia Sư (Sinh viên TVU) 🎓

- 📝 **Đăng ký hồ sơ** với MSSV và thông tin sinh viên
- ✅ **Badge xác thực** "Sinh viên TVU" sau khi admin duyệt
- 🎯 **Chọn môn dạy** và cấp độ (Tiểu học/THCS/THPT)
- 📢 **Xem danh sách bài đăng** từ phụ huynh
- 📤 **Ứng tuyển** các bài đăng phù hợp
- 📊 **Quản lý đơn ứng tuyển** (Đang chờ/Chấp nhận/Từ chối)
- 💰 **Đặt học phí** theo buổi

### Cho Admin 👨‍💼

- ✅ **Xác thực MSSV** sinh viên TVU
- 👥 **Quản lý người dùng** (Phụ huynh, Gia sư)
- 📊 **Thống kê hệ thống** (Users, Posts, Applications, Reviews)
- 🛡️ **Quản lý nội dung** và xử lý vi phạm

---

## �️ Công Nghệ Sử Dụng

### Frontend
- **React 19.1** - UI Library với Hooks
- **TypeScript 5.9** - Type Safety
- **Vite 7.1** (Rolldown) - Build Tool cực nhanh
- **React Router 7** - Client-side Routing
- **Axios** - HTTP Client
- **CSS3 Custom** - Styling thuần, không dùng framework

### Backend
- **Node.js 18+** - JavaScript Runtime
- **Express 4.21** - Web Framework
- **MySQL 8.0** - Relational Database
- **JWT** - Authentication & Authorization
- **Bcrypt** - Password Hashing
- **Express Validator** - Input Validation
- **CORS** - Cross-Origin Resource Sharing

### Database Structure
- **8 bảng chính**: nguoi_dung, ho_so_sinh_vien, ho_so_gia_su, mon_hoc, gia_su_mon_hoc, bai_dang, don_ung_tuyen, danh_gia
- **UTF-8 encoding** (utf8mb4) - Hỗ trợ tiếng Việt đầy đủ
- **JSON fields** - Lưu mảng cấp độ, kỹ năng
- **Foreign Keys** - Đảm bảo tính toàn vẹn dữ liệu

### Tools & DevOps
- **XAMPP** - Local MySQL Server
- **Concurrently** - Run multiple commands
- **Git** - Version Control
- **VS Code** - IDE với ESLint + Prettier

---

## 📦 Cài Đặt & Chạy Dự Án

### ⚙️ Yêu Cầu Hệ Thống

- **Node.js** >= 18.x
- **npm** >= 9.x
- **XAMPP** (hoặc MySQL 8.0)
- **Windows/MacOS/Linux**

### 🚀 Hướng Dẫn Cài Đặt (3 Bước)

#### Bước 1: Cài đặt Dependencies
```bash
# Clone project (hoặc giải nén file zip)
cd DOAN_CHUYENNGANG

# Cài đặt packages
npm install
```

#### Bước 2: Setup Database
```bash
# 1. Mở XAMPP Control Panel
# 2. Start Apache + MySQL
# 3. Mở phpMyAdmin: http://localhost/phpmyadmin
# 4. Import file: database/tutorlink_complete.sql
```

#### Bước 3: Chạy Dự Án
```bash
# Cách 1: Double-click file START.bat (Windows)
# Hoặc

# Cách 2: Chạy bằng lệnh
npm run dev

# ✅ Backend: http://localhost:5000
# ✅ Frontend: http://localhost:5173
```

### 🔑 Tài Khoản Test

**Admin:**
```
Email: admin@tutorlink.vn
Password: giasu123
```

**Gia sư (20 tài khoản):**
```
Email: 1101210001@st.tvu.edu.vn đến 1101210020@st.tvu.edu.vn
Password: 123456
```

**Phụ huynh:** Tự đăng ký tại `/register`

> 📘 **Xem hướng dẫn chi tiết:** [HUONG_DAN_DAY_DU.md](HUONG_DAN_DAY_DU.md)

---

## 🎯 Các Lệnh Hữu Ích

### Development
```bash
# Chạy cả Frontend + Backend
npm run dev

# Chỉ Frontend
npm run dev:frontend

# Chỉ Backend
npm run server

# Build production
npm run build

# Lint & Format
npm run lint
npm run format
```

### Database Scripts
```bash
# Kiểm tra nhanh kết nối
npm run check

# Kiểm tra chi tiết hệ thống
npm run check:full

# Tạo dữ liệu demo
npm run setup
```

> 📘 **Xem thêm utility scripts:** [backend/UTILITY_SCRIPTS.md](backend/UTILITY_SCRIPTS.md)

---

## 📁 Cấu Trúc Dự Án

```
DOAN_CHUYENNGANG/
├── backend/                  # Backend API (Node.js + Express)
│   ├── config/              # Database config
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── tutorController.js
│   │   ├── postController.js
│   │   ├── applicationController.js
│   │   └── adminController.js
│   ├── middleware/          # Auth middleware
│   ├── routes/              # API routes
│   ├── server.js            # Entry point
│   ├── quick-check.js       # Health check script
│   ├── check-system.js      # System stats
│   └── UTILITY_SCRIPTS.md   # Scripts documentation
│
├── database/
│   └── tutorlink_complete.sql  # Database schema + sample data
│
├── src/                     # Frontend (React + TypeScript)
│   ├── api/                 # API client layer
│   │   ├── axios.ts         # Axios config + interceptors
│   │   ├── auth.api.ts      # Auth endpoints
│   │   ├── tutors.api.ts    # Tutors endpoints
│   │   ├── posts.api.ts     # Posts endpoints
│   │   └── admin.api.ts     # Admin endpoints
│   │
│   ├── components/          # React components
│   │   ├── Navbar.tsx       # Navigation
│   │   ├── Footer.tsx       # Footer
│   │   ├── TutorCard.tsx    # Tutor card với badge xác thực
│   │   ├── PostCard.tsx     # Post card
│   │   ├── FilterSidebar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── TutorRegistration.tsx  # Multi-step form
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── TutorsListPage.tsx
│   │   ├── TutorDetailPage.tsx
│   │   ├── PostsListPage.tsx
│   │   ├── CreatePostPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── TutorDashboard.tsx
│   │   ├── ParentDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── TutorRegistrationPage.tsx
│   │
│   ├── contexts/            # React Context
│   │   ├── AuthContext.tsx  # Authentication state
│   │   └── NotificationContext.tsx
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   ├── useDebounce.ts
│   │   └── usePagination.ts
│   │
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   │
│   ├── utils/               # Utilities
│   │   └── dataAdapter.ts   # API response adapters
│   │
│   ├── styles/              # CSS files
│   │   ├── design-system.css
│   │   ├── tutor-card.css
│   │   ├── post-card.css
│   │   └── ...
│   │
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
│
├── docs/                    # Documentation
│   ├── AUTH_API_GUIDE.md
│   ├── DASHBOARD_GUIDE.md
│   └── TEST_ACCOUNTS.md
│
├── .env                     # Environment variables
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── START.bat                # Quick start script (Windows)
├── README.md                # This file
└── HUONG_DAN_DAY_DU.md     # Hướng dẫn đầy đủ (Vietnamese)
```

---

## 🔧 Cấu Hình Môi Trường (.env)

```env
# MySQL Database (XAMPP)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tutorlink_db
DB_CHARSET=utf8mb4

# Backend Server
PORT=5000

# JWT Authentication
JWT_SECRET=tutorlink_tvu_secret_key_2025
JWT_EXPIRES_IN=7d

# Frontend URL (CORS)
CORS_ORIGIN=http://localhost:5173
```

---

## 🗄️ Database Schema

### Bảng chính

**nguoi_dung** - Thông tin người dùng (Admin/Phụ huynh/Gia sư)
- id, email, mat_khau (hashed), ho_ten, vai_tro, trang_thai

**ho_so_sinh_vien** - Hồ sơ sinh viên TVU
- id, nguoi_dung_id, mssv, ma_lop, khoa, nganh, nam_hoc, trang_thai_xac_thuc

**ho_so_gia_su** - Hồ sơ gia sư
- id, nguoi_dung_id, ho_so_sinh_vien_id, gioi_thieu, kinh_nghiem, hoc_phi_gio, cap_do (JSON), ky_nang (JSON)

**mon_hoc** - Danh sách môn học
- id, ten_mon, mo_ta, cap_do_phu_hop (JSON)

**gia_su_mon_hoc** - Môn học của gia sư (many-to-many)
- id, ho_so_gia_su_id, mon_hoc_id

**bai_dang** - Bài đăng tìm gia sư từ phụ huynh
- id, nguoi_dung_id, tieu_de, mo_ta, mon_hoc_id, cap_do, dia_diem, hoc_phi, trang_thai

**don_ung_tuyen** - Đơn ứng tuyển từ gia sư
- id, bai_dang_id, ho_so_gia_su_id, loi_nhan, trang_thai (pending/accepted/rejected)

**danh_gia** - Đánh giá gia sư từ phụ huynh
- id, ho_so_gia_su_id, nguoi_danh_gia_id, diem_danh_gia, noi_dung

> 📘 **Xem SQL đầy đủ:** [database/tutorlink_complete.sql](database/tutorlink_complete.sql)

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
```
POST   /api/auth/register           # Đăng ký (phụ huynh/gia sư)
POST   /api/auth/login              # Đăng nhập
POST   /api/auth/logout             # Đăng xuất
GET    /api/auth/profile            # Lấy thông tin user
```

### Tutors (`/api/tutors`)
```
GET    /api/tutors                  # Danh sách gia sư (có filter)
GET    /api/tutors/:id              # Chi tiết gia sư
POST   /api/tutors/register         # Đăng ký hồ sơ gia sư
PUT    /api/tutors/profile          # Cập nhật hồ sơ
```

### Posts (`/api/posts`)
```
GET    /api/posts                   # Danh sách bài đăng
GET    /api/posts/:id               # Chi tiết bài đăng
POST   /api/posts                   # Tạo bài đăng (phụ huynh)
PUT    /api/posts/:id               # Cập nhật bài đăng
DELETE /api/posts/:id               # Xóa bài đăng
```

### Applications (`/api/applications`)
```
GET    /api/applications            # Danh sách đơn (theo user)
POST   /api/applications            # Ứng tuyển bài đăng
PUT    /api/applications/:id/accept # Chấp nhận đơn
PUT    /api/applications/:id/reject # Từ chối đơn
```

### Admin (`/api/admin`)
```
GET    /api/admin/stats             # Thống kê hệ thống
GET    /api/admin/users             # Quản lý users
PUT    /api/admin/verify-tutor/:id  # Xác thực gia sư
```

> 📘 **Xem API Guide:** [docs/AUTH_API_GUIDE.md](docs/AUTH_API_GUIDE.md)

---

## 🎨 Design System

### Colors
- **Primary**: `#2563EB` (Blue 600)
- **Success**: `#10B981` (Green 500)
- **Warning**: `#F59E0B` (Amber 500)
- **Danger**: `#EF4444` (Red 500)
- **Text**: `#1F2937` (Gray 800)

### Typography
- **Font**: System font stack (SF Pro, Segoe UI, Roboto)
- **Sizes**: 0.75rem → 2rem (responsive)

### Components
- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: 4 variants (primary, secondary, outline, ghost)
- **Forms**: Inline validation, error states
- **Badges**: Verified badge with checkmark icon

---

## 🧪 Testing

### Kịch bản test chính

**1. Đăng ký Phụ huynh**
- Vào `/register`
- Chọn tab "Phụ huynh"
- Nhập thông tin → Submit
- ✅ Tạo account thành công

**2. Đăng ký Gia sư**
- Vào `/register`
- Chọn tab "Gia sư"
- Bước 1: Thông tin cơ bản (email, password)
- Bước 2: Thông tin sinh viên (MSSV, mã lớp)
- Bước 3: Hồ sơ gia sư (môn dạy, học phí)
- Bước 4: Xác nhận
- ✅ Hồ sơ chờ admin duyệt

**3. Tìm kiếm Gia sư**
- Vào `/tutors`
- Filter: Môn học, Cấp độ, Khu vực, Học phí
- ✅ Hiển thị danh sách phù hợp

**4. Đăng bài tìm gia sư**
- Đăng nhập phụ huynh
- Vào `/posts/create`
- Điền form → Submit
- ✅ Bài đăng xuất hiện trong danh sách

**5. Ứng tuyển bài đăng**
- Đăng nhập gia sư
- Vào `/posts`
- Click "Ứng tuyển" trên bài đăng
- ✅ Đơn ứng tuyển được tạo

---

## 📚 Tài Liệu Tham Khảo

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MySQL 8.0 Reference](https://dev.mysql.com/doc/)

---

## 👨‍💻 Tác Giả

**Lê Tuấn Khá**
- MSSV: 110122086
- Email: 110122086@sv.tvu.edu.vn
- Trường: Đại học Trà Vinh
- Khoa: Công nghệ Thông tin

---

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 🙏 Lời Cảm Ơn

Cảm ơn:
- **Giảng viên hướng dẫn** - Hỗ trợ và định hướng dự án
- **Trường Đại học Trà Vinh** - Cung cấp môi trường học tập
- **React, TypeScript, Node.js communities** - Công cụ và tài liệu tuyệt vời

---

<div align="center">
  <strong>🎓 Đồ án chuyên ngành - Trường Đại học Trà Vinh</strong>
  <br>
  Made with ❤️ by Lê Tuấn Khá
</div>
│   │   └── mockData.ts      # 5 gia sư TVU mẫu
│   ├── layouts/             # Layout components
│   ├── assets/              # Images, icons
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   └── main.tsx             # Entry point
├── database/                # Database files
│   ├── schema.sql           # 12 bảng MySQL
│   └── init.sql             # Dữ liệu mẫu
├── docs/                    # Documentation
│   ├── DE_CUONG_CHI_TIET.md
│   ├── QUY_TRINH_DANG_KY.md
│   └── screenshots/
├── .env.example             # Environment template
├── .prettierrc              # Prettier config
├── .eslintrc.json           # ESLint config
├── docker-compose.yml       # Docker config
├── Dockerfile               # Frontend Docker
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── README.md
```

## 🔗 Path Aliases

Project sử dụng TypeScript path aliases để import dễ dàng:

```typescript
// Thay vì:
import { User } from '../../../types'
import { formatDate } from '../../../utils/format'

// Sử dụng:
import { User } from '@/types'
import { formatDate } from '@/utils'
```

### Aliases có sẵn:

| Alias | Path | Mô tả |
|-------|------|-------|
| `@/` | `./src/` | Root src folder |
| `@components` | `./src/components/` | React components |
| `@pages` | `./src/pages/` | Page components |
| `@hooks` | `./src/hooks/` | Custom hooks |
| `@utils` | `./src/utils/` | Utility functions |
| `@services` | `./src/services/` | Business logic |
| `@types` | `./src/types/` | TypeScript types |
| `@config` | `./src/config/` | Configuration |
| `@assets` | `./src/assets/` | Images, icons |
| `@contexts` | `./src/contexts/` | React contexts |
| `@api` | `./src/api/` | API calls |
└── README.md
```

---

## 🗄️ Database Schema

### Sơ Đồ Quan Hệ

```
nguoi_dung (Người dùng)
    ├─→ ho_so_sinh_vien (Hồ sơ SV TVU - BẮT BUỘC cho gia sư)
    ├─→ ho_so_gia_su (Hồ sơ gia sư)
    ├─→ bai_dang (Bài đăng tìm gia sư)
    └─→ danh_gia (Đánh giá)

ho_so_gia_su ↔ mon_hoc (Nhiều-nhiều qua gia_su_mon_hoc)
```

### 12 Bảng Chính

1. **nguoi_dung** - Tài khoản (phụ huynh, gia sư, admin)
2. **ho_so_sinh_vien** - MSSV, mã lớp, khoa (CHỈ GIA SƯ)
3. **ho_so_gia_su** - Thông tin gia sư chi tiết
4. **mon_hoc** - Danh mục môn học
5. **gia_su_mon_hoc** - Môn dạy của gia sư
6. **bai_dang** - Tin tuyển gia sư từ phụ huynh
7. **don_ung_tuyen** - Gia sư ứng tuyển
8. **danh_gia** - Đánh giá gia sư
9. **cuoc_hoi_thoai** - Chat giữa 2 người
10. **tin_nhan** - Tin nhắn chi tiết
11. **thong_bao** - Thông báo hệ thống
12. **lich_day** - Lịch rảnh của gia sư

📖 **Chi tiết**: Xem [`database/schema.sql`](database/schema.sql)

---

## 📡 API Documentation

### Authentication

```http
POST   /api/auth/register          # Đăng ký phụ huynh
POST   /api/auth/register-tutor    # Đăng ký gia sư (có MSSV)
POST   /api/auth/login             # Đăng nhập
GET    /api/auth/me                # Thông tin user hiện tại
POST   /api/auth/logout            # Đăng xuất
```

### Tutors

```http
GET    /api/tutors                 # Danh sách gia sư
GET    /api/tutors/:id             # Chi tiết gia sư
GET    /api/tutors/search          # Tìm kiếm gia sư
POST   /api/tutors                 # Tạo hồ sơ gia sư (require auth)
PUT    /api/tutors/:id             # Cập nhật hồ sơ (require auth)
```

### Posts

```http
GET    /api/posts                  # Danh sách bài đăng
GET    /api/posts/:id              # Chi tiết bài đăng
POST   /api/posts                  # Tạo bài đăng (require auth)
PUT    /api/posts/:id              # Cập nhật bài đăng (require auth)
DELETE /api/posts/:id              # Xóa bài đăng (require auth)
```

### Admin

```http
GET    /api/admin/pending-tutors   # DS gia sư chờ xác thực
PUT    /api/admin/verify/:id       # Xác thực MSSV
GET    /api/admin/stats            # Thống kê hệ thống
```

📖 **Chi tiết**: Xem file [`docs/API.md`](docs/API.md) (Coming soon)

---

## 🤝 Đóng Góp

Chúng tôi luôn chào đón mọi đóng góp! Để đóng góp:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Coding Standards

- ✅ Sử dụng TypeScript
- ✅ Follow ESLint rules
- ✅ Comment code bằng tiếng Việt
- ✅ Viết commit message rõ ràng
- ✅ Test trước khi PR

---

## 👨‍💻 Tác Giả

**Lê Tuấn Khá**
- MSSV: 110122086
- Lớp: DH21IT02
- Khoa: Kỹ thuật và Công nghệ
- Trường: Đại học Trà Vinh

📧 Email: [110122086@sv.tvu.edu.vn](mailto:110122086@sv.tvu.edu.vn)  
🔗 GitHub: [@LeTuanKhaTTD](https://github.com/LeTuanKhaTTD)  
💼 LinkedIn: [Lê Tuấn Khá](https://linkedin.com/in/letuankha)

---

## 📄 License

Dự án này được phân phối dưới **MIT License**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 🙏 Lời Cảm Ơn

- **Trường Đại học Trà Vinh** - Cung cấp cơ sở hạ tầng và hỗ trợ
- **Khoa Kỹ thuật và Công nghệ** - Hướng dẫn và góp ý
- **Cộng đồng Open Source** - Các thư viện và tools tuyệt vời

---

## 📞 Liên Hệ & Hỗ Trợ

- 🐛 **Báo lỗi**: [GitHub Issues](https://github.com/LeTuanKhaTTD/cn-da22ttd-letuankha-tutorlink-nextjs/issues)
- 💡 **Đề xuất**: [GitHub Discussions](https://github.com/LeTuanKhaTTD/cn-da22ttd-letuankha-tutorlink-nextjs/discussions)
- 📧 **Email**: 110122086@sv.tvu.edu.vn

---

<div align="center">
  <p>Được phát triển với ❤️ tại Đại học Trà Vinh</p>
  <p>© 2025 TutorLink. All rights reserved.</p>
  
  ⭐ **Nếu thấy dự án hữu ích, hãy cho một Star nhé!** ⭐
</div
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
