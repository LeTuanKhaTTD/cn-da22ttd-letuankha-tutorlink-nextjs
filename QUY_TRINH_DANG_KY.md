# 🔐 QUY TRÌNH ĐĂNG KÝ - 2 LOẠI TÀI KHOẢN

## 📊 Sơ đồ tổng quan

```
                    ┌─────────────────────┐
                    │   Trang đăng ký     │
                    │   /register         │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Chọn loại tài khoản│
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
        ┌───────▼────────┐           ┌───────▼────────┐
        │ 👪 PHỤ HUYNH   │           │ 🎓 GIA SƯ     │
        │ (Đơn giản)     │           │ (Sinh viên TVU)│
        └───────┬────────┘           └───────┬────────┘
                │                             │
                │                    ┌────────▼─────────┐
                │                    │ Redirect đến     │
                │                    │ /register-tutor  │
                │                    └────────┬─────────┘
                │                             │
        ┌───────▼────────┐           ┌───────▼────────────┐
        │ Form đơn giản: │           │ Form 4 bước:       │
        │ • Email        │           │ 1. Tài khoản       │
        │ • Mật khẩu     │           │ 2. MSSV + Mã lớp   │
        │ • Họ tên       │           │ 3. Avatar          │
        │ • SĐT          │           │ 4. Thông tin GS    │
        └───────┬────────┘           └───────┬────────────┘
                │                             │
        ┌───────▼────────┐           ┌───────▼────────────┐
        │ ✅ Đăng ký     │           │ ⏳ Chờ admin      │
        │    thành công  │           │    xác thực MSSV   │
        └───────┬────────┘           └───────┬────────────┘
                │                             │
        ┌───────▼────────┐           ┌───────▼────────────┐
        │ Kích hoạt      │           │ Email thông báo    │
        │ qua email      │           │ kết quả xác thực   │
        └───────┬────────┘           └───────┬────────────┘
                │                             │
                └──────────────┬──────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Đăng nhập         │
                    │   /login            │
                    └─────────────────────┘
```

---

## 👪 ĐĂNG KÝ PHỤ HUYNH (Đơn giản)

### 📍 Vị trí: `/register`
### ⏱️ Thời gian: ~2 phút

### Bước thực hiện:

1. **Chọn "👪 Phụ huynh"** trong switcher
2. **Điền thông tin:**
   - ✅ Họ và tên (required)
   - ✅ Email (required)
   - ✅ Mật khẩu (required, min 6 ký tự)
   - ⚪ Số điện thoại (optional)
3. **Nhấn "Đăng ký Phụ huynh"**
4. **Nhận email xác thực**
5. **Đăng nhập và sử dụng**

### ✅ Quyền hạn sau khi đăng ký:
- Tìm kiếm gia sư
- Xem profile gia sư (có MSSV)
- Đăng bài tuyển gia sư
- Gửi lời mời đến gia sư
- Nhắn tin với gia sư
- Đánh giá gia sư

### ⚠️ KHÔNG yêu cầu:
- ❌ MSSV
- ❌ Mã lớp
- ❌ Avatar upload
- ❌ Xác thực admin

---

## 🎓 ĐĂNG KÝ GIA SƯ (Sinh viên TVU)

### 📍 Vị trí: `/register` → `/register-tutor`
### ⏱️ Thời gian: ~10-15 phút

### Bước thực hiện:

#### **Bước 0: Chọn loại tài khoản**
1. Vào `/register`
2. Chọn "🎓 Gia sư (Sinh viên TVU)"
3. Thấy thông báo vàng:
   ```
   ⚠️ Đăng ký gia sư yêu cầu xác thực
   Bạn sẽ cần cung cấp MSSV, Mã lớp và Avatar để được phê duyệt
   ```
4. Nhấn "Tiếp tục đăng ký Gia sư →"
5. **Redirect đến `/register-tutor`**

#### **Bước 1: Thông tin tài khoản** 🔐
- ✅ Email (VD: example@tvu.edu.vn)
- ✅ Mật khẩu (min 6 ký tự)
- ✅ Xác nhận mật khẩu

**Validation:**
- Email format chuẩn
- Mật khẩu khớp nhau

#### **Bước 2: Thông tin sinh viên TVU** 🎓
```
┌──────────────────────────────────────┐
│ ⓘ Admin sẽ xác thực MSSV trước khi  │
│   phê duyệt hồ sơ                    │
└──────────────────────────────────────┘
```

- ✅ Họ và tên
- ✅ **MSSV** (9 chữ số) - VD: `110122086`
  - 💡 9 chữ số, ví dụ: 110122086
- ✅ **Mã lớp** - VD: `DH21IT02`
  - 💡 Ví dụ: DH21IT02, DH22EN01
- ✅ Khoa (dropdown):
  - Khoa Kỹ thuật và Công nghệ
  - Khoa Sư phạm
  - Khoa Kinh tế
  - Khoa Nông nghiệp - Thủy sản
  - Khoa Khoa học Tự nhiên
- ✅ Ngành học
- ✅ Năm học (VD: 2021-2025)

**Validation:**
- MSSV phải có đúng 9 số
- Tất cả fields bắt buộc

#### **Bước 3: Ảnh đại diện** 📸
- ✅ Upload avatar (JPG, PNG, WEBP)
- Preview ảnh
- Có thể đổi ảnh

**Yêu cầu:**
- Ảnh chân dung rõ mặt
- Max 2MB
- Recommend: 500x500px

#### **Bước 4: Thông tin gia sư** 📚
- ✅ **Môn học** (checkboxes, chọn ít nhất 1):
  - Toán, Lý, Hóa, Văn, Anh, Lập trình, Kế toán
- ✅ **Cấp độ** (checkboxes, chọn ít nhất 1):
  - THCS, THPT, Đại học
- ⚪ Kinh nghiệm (VD: "2 năm")
- ⚪ Học phí mong muốn (VD: "150.000 VND/buổi")
- ⚪ Hình thức dạy:
  - Online / Offline / Kết hợp
- ✅ **Giới thiệu bản thân** (required)

#### **Submit:**
```
✅ Đăng ký thành công!

📋 Thông tin đã gửi:
- MSSV: 110122086
- Mã lớp: DH21IT02
- Khoa: Khoa Kỹ thuật và Công nghệ

⏳ Bước tiếp theo:
Admin sẽ xác thực MSSV trong vòng 24-48 giờ.
Bạn sẽ nhận email thông báo khi hồ sơ được phê duyệt.

📧 Kiểm tra email: example@tvu.edu.vn
```

### ✅ Quyền hạn sau khi ADMIN XÁC THỰC:
- Badge xác thực ✓ trên profile
- Hiển thị trong tìm kiếm gia sư
- Nhận yêu cầu từ phụ huynh
- Quản lý lịch dạy
- Nhận thanh toán

### ⏳ Trong khi chờ xác thực:
- Có thể đăng nhập
- Chưa hiển thị trong tìm kiếm
- Chưa nhận được yêu cầu
- Profile ở trạng thái "Pending verification"

---

## 🔄 SO SÁNH 2 LOẠI ĐĂNG KÝ

| Tiêu chí | 👪 Phụ huynh | 🎓 Gia sư (SV TVU) |
|----------|--------------|-------------------|
| **Số bước** | 1 bước | 4 bước |
| **Thời gian** | ~2 phút | ~10-15 phút |
| **MSSV** | ❌ Không cần | ✅ BẮT BUỘC |
| **Mã lớp** | ❌ Không cần | ✅ BẮT BUỘC |
| **Avatar** | ❌ Không cần | ✅ BẮT BUỘC |
| **Xác thực admin** | ❌ Không | ✅ Bắt buộc (24-48h) |
| **Redirect** | ❌ Không | ✅ Có (`/register-tutor`) |
| **Trang** | `/register` | `/register-tutor` |

---

## 🎨 UI/UX Chi tiết

### 1. Trang `/register` (AuthPage)

```
┌────────────────────────────────────────────┐
│        Tạo tài khoản mới                   │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────┐  ┌──────────────┐       │
│  │ 👪 Phụ huynh │  │ 🎓 Gia sư    │       │
│  │   (active)   │  │ (Sinh viên)  │       │
│  └──────────────┘  └──────────────┘       │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ Họ và tên *                        │   │
│  │ [Nguyễn Văn A...................]  │   │
│  └────────────────────────────────────┘   │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ Email *                            │   │
│  │ [email@example.com............]    │   │
│  └────────────────────────────────────┘   │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ Mật khẩu *                         │   │
│  │ [••••••••.....................]    │   │
│  └────────────────────────────────────┘   │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ Số điện thoại                      │   │
│  │ [0981 234 567................]     │   │
│  └────────────────────────────────────┘   │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │     Đăng ký Phụ huynh              │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

### 2. Khi chọn "🎓 Gia sư"

```
┌────────────────────────────────────────────┐
│        Tạo tài khoản mới                   │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────┐  ┌──────────────┐       │
│  │ 👪 Phụ huynh │  │ 🎓 Gia sư    │       │
│  │              │  │  (ACTIVE)    │       │
│  └──────────────┘  └──────────────┘       │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ ⚠️ Đăng ký gia sư yêu cầu xác thực│   │
│  │ Bạn sẽ cần cung cấp MSSV, Mã lớp  │   │
│  │ và Avatar để được phê duyệt       │   │
│  └────────────────────────────────────┘   │
│                                            │
│  [Form fields tương tự...]                │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │  Tiếp tục đăng ký Gia sư →        │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

### 3. Trang `/register-tutor` (Multi-step)

```
┌────────────────────────────────────────────┐
│      Đăng ký làm gia sư                    │
│  ⚠️ Chỉ dành cho sinh viên TVU            │
│  ⚠️ Yêu cầu: MSSV và Mã lớp               │
├────────────────────────────────────────────┤
│                                            │
│  ┌──┐  ┌──┐  ┌──┐  ┌──┐                  │
│  │ 1│──│ 2│──│ 3│──│ 4│   Progress       │
│  └──┘  └──┘  └──┘  └──┘                  │
│                                            │
│  [Form content theo từng bước...]         │
│                                            │
│  [Quay lại]              [Tiếp theo]      │
└────────────────────────────────────────────┘
```

---

## 🔐 Security & Validation

### Phụ huynh:
- Email validation (format)
- Password min 6 chars
- Phone number format (optional)

### Gia sư:
- **MSSV**: Exactly 9 digits, unique
- **Mã lớp**: Required, format check
- **Avatar**: Max 2MB, image only
- **Email**: Suggest @tvu.edu.vn
- **Admin verification**: Manual check MSSV

---

## 📧 Email Notifications

### Phụ huynh:
1. Email xác thực ngay sau đăng ký
2. Click link → Activate account

### Gia sư:
1. Email xác nhận đã nhận đơn
2. Email thông báo admin đang xác thực
3. Email kết quả (approved/rejected)
   - ✅ Approved: Link đăng nhập
   - ❌ Rejected: Lý do + hướng dẫn sửa

---

## 🎯 Kết luận

- ✅ **2 quy trình riêng biệt** rõ ràng
- ✅ **Phụ huynh**: Đơn giản, nhanh chóng
- ✅ **Gia sư**: Đầy đủ, xác thực chặt chẽ
- ✅ **UX tốt**: Thông báo rõ ràng, không nhầm lẫn
- ✅ **Security**: MSSV verification bởi admin
