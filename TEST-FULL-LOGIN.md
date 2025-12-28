# HƯỚNG DẪN TEST ĐĂNG NHẬP ĐẦY ĐỦ

## 1. Chuẩn bị

### Khởi động hệ thống:
```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend  
npm run dev
```

### Kiểm tra trạng thái:
- ✅ Backend: http://localhost:5000/api/health
- ✅ Frontend: http://localhost:5174
- ✅ Database: MySQL đang chạy

---

## 2. Test Case 1: Đăng nhập ADMIN

### Bước 1: Mở trang đăng nhập
1. Truy cập: **http://localhost:5174/login**
2. Mở DevTools (F12) → Tab Console

### Bước 2: Đăng nhập
- **Email:** `admin@tutorlink.vn`
- **Mật khẩu:** `admin123`
- Click **Đăng Nhập**

### Bước 3: Kiểm tra Console Logs
Bạn sẽ thấy:
```
🔐 Attempting login... {email: "admin@tutorlink.vn"}
📡 Calling authApi.login...
✅ Login response: {success: true, data: {...}}
👤 User data: {ma_nguoi_dung: 1, ho_ten: "Admin TutorLink", vai_tro: "admin"}
🔑 Token: eyJhbGciOiJIUzI1NiIs...
🚀 Redirecting to dashboard for role: admin
```

### Bước 4: Kiểm tra Redirect
- ✅ Tự động chuyển đến: **http://localhost:5174/dashboard/admin**
- ✅ Navbar hiển thị: "👤 Admin TutorLink"

### Bước 5: Kiểm tra localStorage
```javascript
// Trong Console, gõ:
localStorage.getItem('token')  // Phải có token
localStorage.getItem('user')   // Phải có user info
```

### Bước 6: Test Protected Routes
Thử truy cập các URL sau (phải thành công):
- ✅ http://localhost:5174/dashboard/admin
- ✅ http://localhost:5174/create-post (nếu admin có quyền)

Thử truy cập các URL sau (phải bị chặn):
- ❌ http://localhost:5174/dashboard/tutor → Alert "Bạn không có quyền..."
- ❌ http://localhost:5174/dashboard/parent → Alert "Bạn không có quyền..."

---

## 3. Test Case 2: Đăng nhập GIA SƯ

### Bước 1: Đăng xuất
- Click "Đăng Xuất" trên Navbar
- Kiểm tra: Chuyển về trang chủ
- Kiểm tra localStorage: Đã xóa token và user

### Bước 2: Đăng nhập lại
- Truy cập: **http://localhost:5174/login**
- **Email:** `1101210001@st.tvu.edu.vn`
- **Mật khẩu:** `123456`

### Bước 3: Kiểm tra Console Logs
```
🔐 Attempting login... {email: "1101210001@st.tvu.edu.vn"}
✅ Login response: {success: true, data: {...}}
👤 User data: {vai_tro: "gia_su", ...}
🚀 Redirecting to dashboard for role: gia_su
```

### Bước 4: Kiểm tra Redirect
- ✅ Tự động chuyển đến: **http://localhost:5174/dashboard/tutor**
- ✅ Navbar hiển thị tên gia sư

### Bước 5: Test Tutor Routes
Thử truy cập:
- ✅ http://localhost:5174/dashboard/tutor
- ✅ http://localhost:5174/my-applications
- ❌ http://localhost:5174/dashboard/admin → Bị chặn

---

## 4. Test Case 3: Đăng nhập SAI

### Test 1: Email không tồn tại
- Email: `test@fake.com`
- Password: `anything`
- Kết quả: ❌ Alert "Đăng nhập thất bại!"

### Test 2: Mật khẩu sai
- Email: `admin@tutorlink.vn`
- Password: `wrongpassword`
- Kết quả: ❌ Alert "Đăng nhập thất bại!"

### Test 3: Để trống fields
- Email: (trống)
- Password: (trống)
- Kết quả: ❌ HTML5 validation error

---

## 5. Test Case 4: Token Expiration

### Bước 1: Lấy token
```javascript
// Trong Console
const token = localStorage.getItem('token')
console.log(token)
```

### Bước 2: Test /auth/me endpoint
```javascript
// Test token còn hiệu lực
fetch('http://localhost:5000/api/auth/me', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
})
.then(r => r.json())
.then(data => console.log('✅ Token valid:', data))
.catch(err => console.error('❌ Token invalid:', err))
```

### Bước 3: Test token hết hạn
```javascript
// Thay token bằng token giả
localStorage.setItem('token', 'fake-token-123')

// Reload page → Phải tự động logout và redirect về /login
location.reload()
```

---

## 6. Test Case 5: Direct URL Access

### Khi CHƯA đăng nhập:
Thử truy cập trực tiếp:
- http://localhost:5174/dashboard/admin → ❌ Redirect về /login
- http://localhost:5174/dashboard/tutor → ❌ Redirect về /login
- http://localhost:5174/my-applications → ❌ Redirect về /login

### Khi ĐÃ đăng nhập (admin):
- http://localhost:5174/dashboard/admin → ✅ Hiển thị dashboard
- http://localhost:5174/dashboard/tutor → ❌ Alert + Redirect về /
- http://localhost:5174/dashboard/parent → ❌ Alert + Redirect về /

---

## 7. Test Case 6: Refresh Page

### Bước 1: Đăng nhập
- Login: admin@tutorlink.vn / admin123
- Đến: /dashboard/admin

### Bước 2: Refresh trang (F5)
- ✅ Vẫn ở /dashboard/admin
- ✅ Navbar vẫn hiển thị user
- ✅ Không bị logout

### Bước 3: Kiểm tra AuthContext
```javascript
// Trong Console
JSON.parse(localStorage.getItem('user'))
// Phải trả về user object
```

---

## 8. Kiểm tra Backend Logs

Trong terminal backend, bạn sẽ thấy:
```
POST /api/auth/login 200 - 245ms
GET /api/auth/me 200 - 12ms
```

Nếu thấy lỗi 401 hoặc 500 → Có vấn đề cần fix

---

## 9. Checklist Tổng Hợp

### Backend ✅
- [x] `/api/health` trả về 200
- [x] `/api/auth/login` nhận `{email, mat_khau}` và trả về `{token, user}`
- [x] `/api/auth/me` với Bearer token trả về user info
- [x] Password được hash bằng bcrypt
- [x] JWT token được tạo đúng
- [x] CORS cho phép localhost:5174

### Frontend ✅
- [x] AuthContext lưu token + user vào localStorage
- [x] AuthContext khôi phục state khi refresh
- [x] ProtectedRoute kiểm tra authentication
- [x] ProtectedRoute kiểm tra authorization (role)
- [x] Navbar hiển thị user info khi logged in
- [x] Navbar có nút Logout
- [x] AuthPage gọi authApi.login đúng
- [x] Redirect theo role sau khi login

### Database ✅
- [x] Bảng `nguoi_dung` có 21 users
- [x] Admin: admin@tutorlink.vn (password hash đúng)
- [x] 20 tutors: 1101210001-1101210020 (password hash đúng)
- [x] Column `vai_tro` có giá trị: admin, gia_su, phu_huynh

---

## 10. Troubleshooting

### Lỗi: "Network Error"
```
Kiểm tra:
1. Backend có đang chạy? → node backend/server.js
2. Port 5000 có bị chiếm? → taskkill /F /IM node.exe
3. CORS config có đúng? → Check backend/server.js
```

### Lỗi: "Đăng nhập thất bại"
```
Kiểm tra:
1. Password hash đã fix? → node backend/check-password.js
2. Database có user? → SELECT * FROM nguoi_dung WHERE email = '...'
3. Backend log có lỗi? → Xem terminal backend
```

### Lỗi: Token không lưu
```
Kiểm tra:
1. AuthContext có gọi localStorage.setItem? → Check AuthContext.tsx
2. Browser có block localStorage? → Disable privacy extensions
3. Console có lỗi? → F12 → Tab Console
```

### Lỗi: Không redirect
```
Kiểm tra:
1. Console log có "🚀 Redirecting"? → Nếu không, fix AuthPage.tsx
2. navigate() có được gọi? → Check React Router setup
3. setTimeout có chạy? → Có thể bỏ setTimeout để test
```

---

## 11. File Test Scripts

### Test Backend API (Terminal):
```bash
node backend/test-api-simple.mjs
```

### Test trong Browser Console:
```javascript
// Test login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'admin@tutorlink.vn',
    mat_khau: 'admin123'
  })
})
.then(r => r.json())
.then(d => {
  console.log('✅ Login:', d)
  localStorage.setItem('token', d.data.token)
  localStorage.setItem('user', JSON.stringify(d.data.user))
})
```

### Test HTML UI:
```
Mở: http://localhost:5174/test-login.html
Click: "Test Admin Login"
Xem kết quả màu xanh
```

---

## 12. Kết luận

Hệ thống đăng nhập và phân quyền đã hoàn thiện:
- ✅ **Authentication**: JWT token-based
- ✅ **Authorization**: Role-based access control
- ✅ **Protected Routes**: ProtectedRoute component
- ✅ **State Management**: AuthContext với localStorage
- ✅ **Security**: bcrypt password hashing
- ✅ **UX**: Auto-redirect theo role, logout, refresh-safe

**Test accounts:**
- Admin: `admin@tutorlink.vn` / `admin123`
- Tutor: `1101210001@st.tvu.edu.vn` / `123456`

**Để test toàn bộ:** Mở http://localhost:5174/login và làm theo các bước trên! 🚀
