# 🔐 TÀI KHOẢN TEST - TUTORLINK

Hệ thống có sẵn 3 tài khoản mẫu để test các vai trò khác nhau.

---

## 👥 DANH SÁCH TÀI KHOẢN

### 1. 👨‍💼 ADMIN (Quản trị viên)

**Email:** `admin@tutorlink.com`  
**Password:** `admin123`

**Quyền hạn:**
- ✅ Xác thực MSSV sinh viên (tutor verification)
- 📊 Xem dashboard thống kê hệ thống
- 🛡️ Quản lý users (kích hoạt/vô hiệu hóa)
- 📋 Quản lý nội dung (posts, reviews)
- 🔍 Xem danh sách pending verifications

**Dashboard:** `/dashboard/admin`

---

### 2. 👪 PARENT (Phụ Huynh)

**Email:** `parent@gmail.com`  
**Password:** `parent123`

**Quyền hạn:**
- 📢 Đăng bài tìm gia sư
- 🔍 Tìm kiếm gia sư theo bộ lọc
- 💬 Nhắn tin với gia sư
- ✅ Chấp nhận/từ chối đơn ứng tuyển
- ⭐ Đánh giá gia sư sau khóa học
- 📅 Quản lý lịch học

**Dashboard:** `/dashboard/parent`

---

### 3. 🎓 TUTOR (Gia Sư - Sinh viên TVU)

**Email:** `110122086@st.tvu.edu.vn`  
**Password:** `tutor123`

**Thông tin:**
- Họ tên: Nguyễn Thị Minh Anh
- MSSV: 110122086
- Lớp: DH21CS01
- Khoa: Sư phạm
- Ngành: Sư phạm Toán
- Trạng thái: ✅ Đã xác thực

**Quyền hạn:**
- 🏆 Tạo/cập nhật hồ sơ gia sư
- 📝 Ứng tuyển các bài đăng
- 💬 Nhắn tin với phụ huynh
- 📅 Quản lý lịch dạy
- 📊 Xem thống kê ứng tuyển
- ⭐ Nhận đánh giá từ phụ huynh

**Dashboard:** `/dashboard/tutor`

---

## 🧪 HƯỚNG DẪN TEST

### Test Flow 1: Admin xác thực MSSV

1. Đăng nhập với tài khoản **tutor** chưa verify
2. Đăng ký làm gia sư với MSSV hợp lệ
3. Logout → Login với tài khoản **admin**
4. Vào `/admin` → Xác thực MSSV
5. Logout → Login lại với **tutor**
6. Thấy badge "✓ Sinh viên TVU" trên profile

### Test Flow 2: Parent tìm gia sư

1. Đăng nhập với **parent**
2. Vào `/tutors` → Tìm kiếm gia sư
3. Lọc theo môn học, cấp độ, khu vực
4. Click vào TutorCard → Xem chi tiết
5. Nhắn tin hoặc mời dạy

### Test Flow 3: Tutor ứng tuyển

1. Đăng nhập với **tutor**
2. Vào `/posts` → Xem bài đăng tìm gia sư
3. Click "Ứng tuyển"
4. Chờ parent chấp nhận
5. Nhận thông báo khi được chấp nhận

### Test Flow 4: Chat giữa Parent & Tutor

1. Đăng nhập với **parent**
2. Vào `/chat` → Chọn conversation
3. Gửi tin nhắn cho tutor
4. Logout → Login với **tutor**
5. Vào `/chat` → Thấy tin nhắn mới
6. Reply lại

---

## 📝 MOCK DATA

File `src/data/mockData.ts` chứa:

```typescript
export const mockUsers: User[] = [
  { id: 'user-admin-01', email: 'admin@tutorlink.com', vai_tro: 'admin' },
  { id: 'user-parent-01', email: 'parent@gmail.com', vai_tro: 'phu_huynh' },
  { id: 'tutor-01', email: '110122086@st.tvu.edu.vn', vai_tro: 'gia_su' },
]

export const mockCredentials = {
  admin: { email: 'admin@tutorlink.com', password: 'admin123' },
  parent: { email: 'parent@gmail.com', password: 'parent123' },
  tutor: { email: '110122086@st.tvu.edu.vn', password: 'tutor123' },
}
```

---

## 🔒 BẢO MẬT

**⚠️ LƯU Ý:** Đây là mock data cho **development/testing only**.

**Production cần:**
- Hash passwords với bcrypt
- JWT authentication
- HTTPS only
- Rate limiting
- CSRF protection
- Environment variables cho secrets

**Không bao giờ:**
- ❌ Commit passwords vào Git
- ❌ Dùng plaintext passwords
- ❌ Hardcode credentials
- ❌ Share production credentials

---

## 🚀 SỬ DỤNG TRONG CODE

### Frontend Login

```typescript
import { authService } from '@/services'
import { mockCredentials } from '@/data/mockData'

// Test login
const response = await authService.login({
  email: mockCredentials.admin.email,
  password: mockCredentials.admin.password,
})
```

### Backend Mock Authentication

```typescript
// authController.ts
export async function login(req, res) {
  const { email, password } = req.body
  
  const user = mockUsers.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: 'Email không tồn tại' })
  
  const validPassword = Object.values(mockCredentials).some(
    cred => cred.email === email && cred.password === password
  )
  if (!validPassword) return res.status(401).json({ message: 'Mật khẩu sai' })
  
  const token = generateJWT(user)
  res.json({ user, token })
}
```

---

## 📚 TÀI LIỆU LIÊN QUAN

- [README.md](../README.md) - Tổng quan project
- [ARCHITECTURE.md](../ARCHITECTURE.md) - Kiến trúc hệ thống
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Hướng dẫn đóng góp
- [QUY_TRINH_DANG_KY.md](../QUY_TRINH_DANG_KY.md) - Quy trình đăng ký

---

**Happy Testing! 🎉**
