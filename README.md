<div align="center">
  <img src="src/assets/logo.svg" alt="TutorLink Logo" width="120" height="120">
  
  # 🎓 TutorLink - Hệ Thống Kết Nối Gia Sư TVU
  
  ### Nền tảng kết nối sinh viên Đại học Trà Vinh với phụ huynh tìm gia sư
  
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite)](https://vitejs.dev/)
  [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  
  [Demo](https://tutorlink-tvu.vercel.app) · [Báo Lỗi](https://github.com/LeTuanKhaTTD/cn-da22ttd-letuankha-tutorlink-nextjs/issues) · [Đề Xuất Tính Năng](https://github.com/LeTuanKhaTTD/cn-da22ttd-letuankha-tutorlink-nextjs/issues)
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

---

## ✨ Tính Năng

### Cho Phụ Huynh 👪

- 🔍 Tìm kiếm gia sư theo môn học, cấp độ, khu vực
- 📋 Đăng bài tuyển gia sư với yêu cầu cụ thể
- 💬 Nhắn tin trực tiếp với gia sư
- ⭐ Đánh giá và review sau khóa học
- 📊 Xem thông tin MSSV, mã lớp của gia sư

### Cho Gia Sư (Sinh viên TVU) 🎓

- 📝 Đăng ký với MSSV và thông tin sinh viên
- ✅ Xác thực bởi admin (24-48h)
- 🏆 Nhận badge "Sinh viên TVU đã xác thực"
- 📢 Nhận yêu cầu từ phụ huynh
- 📅 Quản lý lịch dạy
- 💰 Theo dõi thu nhập

### Cho Admin 👨‍💼

- ✅ Xác thực MSSV sinh viên
- 📊 Thống kê người dùng, bài đăng
- 🛡️ Quản lý nội dung, xử lý vi phạm

---

## 🖼️ Demo & Screenshots

### Trang Chủ
<div align="center">
  <img src="docs/screenshots/homepage.png" alt="Homepage" width="800">
</div>

### Đăng Ký Gia Sư (Multi-step Form)
<div align="center">
  <img src="docs/screenshots/tutor-registration.png" alt="Tutor Registration" width="800">
</div>

### Danh Sách Gia Sư với Badge Xác Thực
<div align="center">
  <img src="docs/screenshots/tutors-list.png" alt="Tutors List" width="800">
</div>

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **React 19.0** - UI Library
- **TypeScript 5.6** - Type Safety
- **Vite 7.1** - Build Tool & Dev Server
- **React Router 7** - Routing
- **CSS3** - Custom Styling (No frameworks)

### Backend (Coming Soon)
- **Node.js + Express** - REST API
- **MySQL 8.0** - Database
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Multer + Cloudinary** - File Upload

### DevOps
- **Docker + Docker Compose** - Containerization
- **Git** - Version Control
- **GitHub Actions** - CI/CD

---

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống

- Node.js >= 18.x
- npm >= 9.x hoặc yarn >= 1.22
- Docker Desktop (nếu dùng Docker)

### Cách 1: Cài Đặt Thông Thường

```bash
# 1. Clone repository
git clone https://github.com/LeTuanKhaTTD/cn-da22ttd-letuankha-tutorlink-nextjs.git
cd cn-da22ttd-letuankha-tutorlink-nextjs

# 2. Cài đặt dependencies
npm install

# 3. Copy file môi trường
cp .env.example .env

# 4. Chạy development server
npm run dev

# 5. Mở trình duyệt
# http://localhost:5173
```

### Cách 2: Sử Dụng Docker (Khuyên Dùng)

```bash
# 1. Clone repository
git clone https://github.com/LeTuanKhaTTD/cn-da22ttd-letuankha-tutorlink-nextjs.git
cd cn-da22ttd-letuankha-tutorlink-nextjs

# 2. Chạy Docker Compose
docker-compose up -d

# 3. Truy cập các services
# Frontend:    http://localhost:5173
# Backend API: http://localhost:5000
# phpMyAdmin:  http://localhost:8080
# MySQL:       localhost:3306
```

---

## 🚀 Sử Dụng

### Development

```bash
# Chạy dev server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

### Docker Commands

```bash
# Start tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Stop tất cả services
docker-compose down

# Rebuild images
docker-compose up -d --build

# Xóa volumes (reset database)
docker-compose down -v
```

---

## 📁 Cấu Trúc Dự Án

```
DOAN_CHUYENNGANG/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer
│   │   ├── TutorCard.tsx    # Tutor card với badge
│   │   ├── TutorRegistration.tsx  # Form đăng ký gia sư (4 bước)
│   │   └── SearchBar.tsx    # Tìm kiếm
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── AuthPage.tsx     # Đăng ký/Đăng nhập
│   │   ├── TutorRegistrationPage.tsx
│   │   ├── TutorsListPage.tsx
│   │   └── ...
│   ├── types/               # TypeScript types
│   │   └── index.ts         # StudentProfile, Tutor, Post...
│   ├── data/                # Mock data
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
├── docker-compose.yml       # Docker config
├── Dockerfile               # Frontend Docker
├── package.json
├── tsconfig.json
├── vite.config.ts
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

**Lê Tuấn Kha**
- MSSV: 110122086
- Lớp: DA22TTD
- Khoa: Công nghệ thông tin
- Trường: Trường Đại học Trà Vinh

📧 Email: [110122086@sv.tvu.edu.vn](mailto:110122086@sv.tvu.edu.vn)  
🔗 GitHub: [@LeTuanKhaTTD](https://github.com/LeTuanKhaTTD)  
💼 LinkedIn: [Lê Tuấn Khá](https://linkedin.com/in/letuankha)

---

## 📄 License

Dự án này được phân phối dưới **MIT License**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

--

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
