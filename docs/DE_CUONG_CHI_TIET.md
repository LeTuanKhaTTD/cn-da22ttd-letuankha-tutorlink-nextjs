# BỘ MÔN CÔNG NGHỆ THÔNG TIN
# ĐỀ CƯƠNG CHI TIẾT ĐỒ ÁN

## 📌 THÔNG TIN CHUNG

**Tên đề tài:** HỆ THỐNG KẾT NỐI GIA SƯ - TRƯỜNG ĐẠI HỌC TRÀ VINH  
**Thời gian:** 18/10/2025 - 18/12/2025 (8 tuần)  
**Sinh viên:** [Họ tên] - 110122086  
**GVHD:** [Họ tên GVHD]

---

## 📋 TỔNG QUAN DỰ ÁN

### 📱 Mô tả
Nền tảng web kết nối giữa phụ huynh/học sinh và **sinh viên Trường Đại học Trà Vinh** làm gia sư, cho phép:
- Phụ huynh đăng tin tìm gia sư theo nhu cầu
- **Sinh viên TVU** tạo hồ sơ gia sư (xác thực bằng MSSV)
- Hai bên tương tác trực tiếp qua tin nhắn

### 🎯 Mục tiêu
- Kết nối sinh viên TVU với nhu cầu dạy thêm tại địa phương
- Tạo cơ hội kiếm thu nhập cho sinh viên
- Giao diện hiện đại, thân thiện, dễ sử dụng
- Xác thực danh tính sinh viên chặt chẽ

---

## 👥 ĐỐI TƯỢNG SỬ DỤNG

### 👨‍👩‍👧 Phụ huynh/Học sinh
- Đăng tin tìm gia sư (môn học, cấp lớp, học phí...)
- Tìm kiếm hồ sơ sinh viên TVU theo bộ lọc
- Gửi lời mời dạy & nhắn tin
- Quản lý tin đăng & đánh giá gia sư

### 👨‍🎓 Sinh viên TVU (Gia sư)
**Điều kiện:** Phải là sinh viên đang học tại Trường ĐH Trà Vinh

**Quy trình đăng ký:**
1. Đăng ký tài khoản với thông tin:
   - Email (khuyến khích dùng email sinh viên TVU)
   - Mật khẩu
   - Họ tên đầy đủ
   - **Mã số sinh viên (MSSV)** - bắt buộc
   - **Mã lớp** - bắt buộc
   - Số điện thoại
   - **Upload ảnh đại diện (Avatar)** - bắt buộc
   
2. Tạo hồ sơ gia sư:
   - Khoa/Ngành học
   - Năm học hiện tại
   - Môn có thể dạy
   - Kinh nghiệm (nếu có)
   - Học phí mong muốn
   - Lịch rảnh

**Chức năng:**
- Tìm & ứng tuyển tin đăng
- Nhận đánh giá từ phụ huynh
- Quản lý lịch dạy

### 👨‍💼 Quản trị viên
- Xác minh MSSV của sinh viên
- Quản lý tài khoản & bài đăng
- Xem thống kê hệ thống

---

## 💻 CÔNG NGHỆ

**Frontend:** React 19 + TypeScript, Vite, React Router DOM 7, CSS3 Modern Design  
**Backend:** Node.js + Express.js, JWT, Bcrypt, Multer (upload file)  
**Database:** MySQL 8.0  
**Storage:** Cloudinary / AWS S3 (lưu ảnh avatar)  
**Tools:** Git/GitHub, Postman, VS Code

---

## 🗄️ CƠ SỞ DỮ LIỆU

**12 bảng chính:**

| Bảng | Mô tả | Fields chính |
|------|-------|--------------|
| **users** | Tài khoản người dùng | id, email, password, role, name, phone, avatar_url |
| **student_profiles** | **Thông tin sinh viên TVU** | **id, user_id, student_id (MSSV), class_code, faculty, major, academic_year, verified** |
| **tutors** | Hồ sơ gia sư | id, user_id, title, bio, hourly_rate, teaching_mode, experience |
| **posts** | Tin tìm gia sư | id, parent_id, subject, level, location, budget, description |
| **applications** | Đơn ứng tuyển | id, post_id, tutor_id, status, message |
| **subjects** | Môn học | id, name, category, icon |
| **tutor_subjects** | Môn học của gia sư | id, tutor_id, subject_id, level, proficiency |
| **reviews** | Đánh giá | id, tutor_id, parent_id, rating, comment |
| **messages** | Tin nhắn | id, conversation_id, sender_id, body, created_at |
| **conversations** | Cuộc hội thoại | id, user1_id, user2_id, last_message_at |
| **notifications** | Thông báo | id, user_id, type, title, body, read |
| **schedules** | Lịch dạy | id, tutor_id, day_of_week, time_slot, status |

### 🆕 Bảng mới: student_profiles

```sql
CREATE TABLE student_profiles (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL UNIQUE,
  student_id VARCHAR(20) NOT NULL UNIQUE, -- MSSV
  class_code VARCHAR(20) NOT NULL,        -- Mã lớp
  faculty VARCHAR(100),                   -- Khoa
  major VARCHAR(100),                     -- Ngành
  academic_year VARCHAR(20),              -- Năm học (VD: 2023-2024)
  verified BOOLEAN DEFAULT FALSE,         -- Admin xác minh
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🎨 THIẾT KẾ GIAO DIỆN HIỆN ĐẠI

### Design System

**Màu sắc chủ đạo:**
- Primary: `#1d4ed8` (Blue 700) - Màu xanh đại diện TVU
- Secondary: `#0ea5e9` (Sky 500) - Xanh nhạt
- Success: `#10b981` (Green 500)
- Warning: `#f59e0b` (Amber 500)
- Danger: `#ef4444` (Red 500)
- Text: `#1f2937` (Gray 800)
- Muted: `#6b7280` (Gray 500)

**Typography:**
- Font: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI"
- Heading: 700 weight
- Body: 400 weight
- Small: 0.875rem

**Spacing Scale:**
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Border Radius:**
- sm: 8px, md: 12px, lg: 16px, xl: 20px, 2xl: 24px

**Shadows:**
- Soft: `0 2px 8px rgba(0,0,0,0.08)`
- Medium: `0 4px 16px rgba(0,0,0,0.12)`
- Large: `0 8px 32px rgba(0,0,0,0.16)`

### Trang chính & Cải tiến UI/UX

**1. Trang chủ (Home)**
- Hero section với gradient background
- CTA rõ ràng: "Tìm gia sư" / "Trở thành gia sư"
- Stats section: Số sinh viên, Số tin đăng, Đánh giá
- Benefits section với icons
- Testimonials từ phụ huynh

**2. Đăng ký Gia sư (Register Tutor)**
- **Form nhiều bước (Multi-step):**
  - Bước 1: Thông tin tài khoản (Email, Password)
  - Bước 2: **Thông tin sinh viên TVU** (MSSV, Mã lớp, Khoa, Ngành)
  - Bước 3: **Upload Avatar** (Crop & preview)
  - Bước 4: Thông tin gia sư (Môn dạy, Học phí, Lịch rảnh)
- Progress indicator
- Validation realtime
- Preview trước khi submit

**3. Hồ sơ Gia sư (Tutor Profile)**
- **Avatar tròn** với verified badge (nếu đã xác minh)
- **Badge sinh viên TVU** nổi bật
- Layout 2 cột:
  - Cột trái: Avatar, Info card (MSSV, Lớp, Khoa)
  - Cột phải: Bio, Môn dạy, Reviews
- Tabs: Giới thiệu, Đánh giá, Lịch rảnh
- Nút CTA: "Gửi lời mời" / "Nhắn tin"

**4. Danh sách Gia sư (Tutors List)**
- Grid layout responsive (3 cột → 2 cột → 1 cột)
- **Card hiện đại:**
  - Avatar + verified badge
  - Tên + Khoa/Ngành
  - Rating stars ⭐⭐⭐⭐⭐
  - Môn dạy (pills)
  - Học phí/giờ
  - Hover effect: shadow + scale
- Sidebar filters:
  - Môn học
  - Cấp học
  - Khoa/Ngành
  - Học phí (range slider)
  - Rating
- Search bar với autocomplete

**5. Đăng tin tìm gia sư (Create Post)**
- Form clean, rõ ràng
- Icons cho mỗi field
- Placeholder hướng dẫn chi tiết
- Preview bài đăng trước khi đăng
- Auto-save draft

**6. Dashboard**
- **Dành cho Phụ huynh:**
  - Quick stats cards
  - Tin đăng của tôi (table modern)
  - Gia sư đã lưu
  - Tin nhắn mới
  
- **Dành cho Gia sư:**
  - Stats: Profile views, Ứng tuyển, Rating
  - Tin đăng phù hợp (recommendations)
  - Lịch dạy tuần này (calendar view)
  - Thu nhập tháng này

**7. Chat**
- Sidebar: Danh sách conversations
- Main area: Messages với scroll infinite
- Input box với emoji picker
- Typing indicator
- Read receipts
- File attachment support

**8. Admin Panel**
- Sidebar navigation
- Dashboard với charts
- Tables với pagination, sort, filter
- Modal xác minh MSSV
- Bulk actions

---

## 📱 RESPONSIVE DESIGN

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile-first approach:**
- Navigation: Hamburger menu
- Cards: Full width
- Forms: Single column
- Touch-friendly buttons (min 44x44px)

---

## ✨ TÍNH NĂNG NỔI BẬT

### 1. Xác thực Sinh viên TVU
- Admin kiểm tra MSSV với danh sách sinh viên
- Gửi email xác nhận sau khi duyệt
- Chỉ sinh viên verified mới hiển thị công khai
- Badge "Đã xác minh" trên hồ sơ

### 2. Upload & Quản lý Avatar
- Drag & drop upload
- Image cropper (1:1 ratio)
- Preview trước khi upload
- Tự động resize & optimize
- Lưu trữ trên Cloudinary

### 3. Smart Search & Filter
- Tìm kiếm theo text (tên, môn học)
- Multiple filters (AND/OR logic)
- Sort: Rating, Giá, Mới nhất
- Pagination hoặc Infinite scroll

### 4. Review System
- Rating 5 sao
- Comment text
- Photos (optional)
- Chỉ phụ huynh đã thuê mới review được
- Admin moderate

### 5. Notification System
- Realtime với WebSocket
- Push notification (browser)
- Email notification
- Badge unread count

---

## ⏱️ KẾ HOẠCH THỰC HIỆN

| Tuần | Nội dung | 
|------|----------|
| **1** | **Phân tích & Thiết kế** <br>- Nghiên cứu yêu cầu TVU<br>- Thiết kế UI/UX mockups<br>- Use case & Database design |
| **2** | **Database & API Design** <br>- Thiết kế ERD (12 bảng)<br>- Viết SQL schema<br>- Design API endpoints<br>- Setup Cloudinary |
| **3** | **Backend - Authentication** <br>- Setup project structure<br>- User registration với MSSV<br>- JWT authentication<br>- Upload avatar API |
| **4** | **Backend - Core APIs** <br>- Tutors API (CRUD)<br>- Posts API (CRUD)<br>- Applications API<br>- Student verification API |
| **5** | **Frontend - Setup & Auth** <br>- Setup React + TypeScript + Vite<br>- Design System components<br>- Auth pages (Login/Register multi-step)<br>- Avatar upload component |
| **6** | **Frontend - Main Pages** <br>- Home page với hero<br>- Tutors List với filters<br>- Tutor Detail page<br>- Create Post page |
| **7** | **Frontend - Advanced Features** <br>- Dashboard (Parent/Tutor)<br>- Chat system<br>- Admin Panel<br>- Notifications<br>- Responsive optimization |
| **8** | **Testing, Deploy & Docs** <br>- Unit & Integration testing<br>- Bug fixes<br>- Deploy to hosting<br>- User guide<br>- Final report |

---

## 📊 TIÊU CHÍ ĐÁNH GIÁ

- **Tính hoàn thiện:** Chức năng hoạt động đầy đủ (35%)
- **Tính xác thực:** Xác minh MSSV chính xác (15%)
- **UI/UX:** Giao diện hiện đại, thân thiện, responsive (20%)
- **Chất lượng code:** Clean code, maintainable (15%)
- **Tài liệu:** Đầy đủ, chi tiết (10%)
- **Thuyết trình:** Demo mượt mà, trả lời tốt (5%)

---

## 🔒 BẢO MẬT & RIÊNG TƯ

- MSSV được mã hóa trong database
- Chỉ admin xem được MSSV đầy đủ
- Avatar được scan virus trước khi lưu
- Rate limiting cho upload
- JWT token expire sau 7 ngày
- Password hash với bcrypt (cost 12)

---

**Xác nhận của GVHD**  
Ngày......tháng......năm......

**SV Thực hiện**  
(Ký tên)
