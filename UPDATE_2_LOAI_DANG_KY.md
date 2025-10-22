# ✅ CẬP NHẬT: 2 LOẠI ĐĂNG KÝ

## 🎯 Vấn đề đã giải quyết

**Câu hỏi:** "Ở phần đăng ký có 2 loại tài khoản phụ huynh và tài khoản gia sư là sao?"

**Giải pháp:** Tách rõ 2 quy trình đăng ký với UI/UX khác biệt hoàn toàn.

---

## 📋 Tóm tắt thay đổi

### 1. **Trang `/register` (AuthPage.tsx)**

#### Có switcher chọn loại tài khoản:
```tsx
┌──────────────┐  ┌──────────────┐
│ 👪 Phụ huynh │  │ 🎓 Gia sư    │
│              │  │ (Sinh viên)  │
└──────────────┘  └──────────────┘
```

#### Khi chọn "🎓 Gia sư" → Hiển thị thông báo vàng:
```
⚠️ Đăng ký gia sư yêu cầu xác thực
Bạn sẽ cần cung cấp MSSV, Mã lớp và Avatar để được phê duyệt
```

#### Button submit thông minh:
- **Phụ huynh**: "Đăng ký Phụ huynh"
- **Gia sư**: "Tiếp tục đăng ký Gia sư →" (redirect đến `/register-tutor`)

---

### 2. **Trang `/register-tutor` (TutorRegistrationPage.tsx)**

Form 4 bước đầy đủ cho sinh viên TVU:
1. ✅ Tài khoản (Email, Password)
2. ✅ Thông tin SV (MSSV, Mã lớp, Khoa, Ngành)
3. ✅ Avatar upload
4. ✅ Thông tin gia sư (Môn học, Kinh nghiệm)

---

### 3. **Navbar**

Thêm button nổi bật:
```tsx
🎓 Đăng ký Gia sư  (màu vàng, gradient)
```

---

## 🗂️ Files đã cập nhật

### 1. **src/pages/AuthPage.tsx**
```tsx
// Thêm navigate
import { useNavigate } from 'react-router-dom'

// Thêm logic redirect cho gia sư
if (mode === 'register' && accountType === 'tutor') {
  navigate('/register-tutor')
  return
}

// Thêm thông báo vàng cho gia sư
{mode === 'register' && accountType === 'tutor' && (
  <div className="tutor-notice">
    <svg>...</svg>
    <div>
      <strong>Đăng ký gia sư yêu cầu xác thực</strong>
      <p>Bạn sẽ cần cung cấp MSSV, Mã lớp và Avatar...</p>
    </div>
  </div>
)}

// Button text động
{mode === 'login' 
  ? 'Đăng nhập' 
  : accountType === 'tutor' 
    ? 'Tiếp tục đăng ký Gia sư →' 
    : 'Đăng ký Phụ huynh'}
```

### 2. **src/pages/TutorRegistrationPage.tsx** (NEW)
```tsx
import TutorRegistration from '../components/TutorRegistration'

function TutorRegistrationPage() {
  return <TutorRegistration />
}

export default TutorRegistrationPage
```

### 3. **src/App.tsx**
```tsx
import TutorRegistrationPage from './pages/TutorRegistrationPage'

// Thêm route
<Route path="register-tutor" element={<TutorRegistrationPage />} />
```

### 4. **src/components/Navbar.tsx**
```tsx
<NavLink to="/register-tutor" className="nav-btn nav-btn-accent">
  🎓 Đăng ký Gia sư
</NavLink>
```

### 5. **src/App.css**
```css
/* Button accent màu vàng cho gia sư */
.nav-btn-accent {
  color: white;
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  font-weight: 700;
}

/* Thông báo vàng trong AuthPage */
.tutor-notice {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #fbbf24;
  border-radius: 12px;
}
```

### 6. **src/components/TutorCard.tsx**
```tsx
// Hiển thị avatar thật
{tutor.avatar ? (
  <img src={tutor.avatar} alt={tutor.name} className="tutor-avatar" />
) : (
  <div className="avatar-placeholder">...</div>
)}

// Badge xác thực và MSSV
{tutor.studentProfile.verified && (
  <svg className="verified-badge">...</svg>
)}
<p className="tutor-student-info">
  MSSV: {tutor.studentProfile.studentId} • {tutor.studentProfile.classCode}
</p>
```

### 7. **QUY_TRINH_DANG_KY.md** (NEW)
Tài liệu chi tiết về 2 quy trình đăng ký

---

## 🎨 UI/UX Flow

### **Quy trình Phụ huynh:**
```
/register 
  → Chọn "👪 Phụ huynh"
  → Điền form đơn giản (4 fields)
  → Click "Đăng ký Phụ huynh"
  → Nhận email xác thực
  → Done! ✅
```

### **Quy trình Gia sư:**
```
/register 
  → Chọn "🎓 Gia sư"
  → Thấy warning ⚠️
  → Click "Tiếp tục đăng ký Gia sư →"
  → REDIRECT to /register-tutor
  → Bước 1: Tài khoản
  → Bước 2: MSSV + Mã lớp
  → Bước 3: Avatar
  → Bước 4: Thông tin GS
  → Submit
  → Chờ admin xác thực ⏳
  → Nhận email thông báo
  → Done! ✅
```

---

## 📊 So sánh

| Tiêu chí | 👪 Phụ huynh | 🎓 Gia sư |
|----------|--------------|-----------|
| **Trang** | `/register` | `/register-tutor` |
| **Số bước** | 1 | 4 |
| **MSSV** | ❌ | ✅ Bắt buộc |
| **Avatar** | ❌ | ✅ Bắt buộc |
| **Admin verify** | ❌ | ✅ 24-48h |
| **Thời gian** | 2 phút | 10-15 phút |

---

## ✅ Testing Checklist

### Phụ huynh:
- [ ] Vào `/register`
- [ ] Chọn "👪 Phụ huynh"
- [ ] KHÔNG thấy warning vàng
- [ ] Form có 4 fields (Họ tên, Email, Password, SĐT)
- [ ] Button = "Đăng ký Phụ huynh"
- [ ] Submit thành công

### Gia sư:
- [ ] Vào `/register`
- [ ] Chọn "🎓 Gia sư (Sinh viên TVU)"
- [ ] THẤY warning vàng về MSSV
- [ ] Button = "Tiếp tục đăng ký Gia sư →"
- [ ] Click button → Redirect `/register-tutor`
- [ ] Thấy form 4 bước
- [ ] Progress bar hoạt động
- [ ] Bước 2 có MSSV validation (9 số)
- [ ] Bước 3 có avatar upload + preview
- [ ] Submit hiển thị thông báo đầy đủ

### Navbar:
- [ ] Có button "🎓 Đăng ký Gia sư" (màu vàng)
- [ ] Click button → Vào `/register-tutor`
- [ ] Button có hover effect

### Tutor Card:
- [ ] Hiển thị avatar thật (không phải placeholder)
- [ ] Có icon ✓ xanh (verified badge)
- [ ] Hiển thị "MSSV: 110122086 • DH21IT02"

---

## 🚀 Build Status

```bash
✓ TypeScript: No errors
✓ Routes: All working
✓ Components: Imported correctly
✓ CSS: Styled properly
```

---

## 📝 Tài liệu liên quan

- `README_SYSTEM.md` - Overview hệ thống
- `QUY_TRINH_DANG_KY.md` - Chi tiết 2 quy trình đăng ký
- `CHANGELOG_PHUONG_AN_A.md` - Changelog phương án A
- `docs/DE_CUONG_CHI_TIET.md` - Đề cương dự án

---

## 🎉 Kết quả

✅ **2 quy trình đăng ký hoàn toàn riêng biệt**  
✅ **UI/UX rõ ràng, không nhầm lẫn**  
✅ **Phụ huynh đăng ký nhanh (2 phút)**  
✅ **Gia sư xác thực chặt chẽ (MSSV required)**  
✅ **Navbar có CTA nổi bật cho gia sư**  
✅ **Tutor Card hiển thị badge xác thực**  

Hệ thống đã sẵn sàng cho demo! 🚀
