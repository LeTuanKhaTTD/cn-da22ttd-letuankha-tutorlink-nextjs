# 🔐 AUTHENTICATION API - HƯỚNG DẪN SỬ DỤNG

## 📋 MỤC LỤC
1. [Đăng ký theo vai trò](#đăng-ký-theo-vai-trò)
2. [Đăng nhập](#đăng-nhập)
3. [Đăng xuất](#đăng-xuất)
4. [Lấy thông tin user hiện tại](#lấy-thông-tin-user-hiện-tại)

---

## 🔑 ĐĂNG KÝ THEO VAI TRÒ

### 1️⃣ ĐĂNG KÝ PHỤ HUYNH

**Endpoint:** `POST /api/auth/register/parent`

**Request Body:**
```json
{
  "email": "nguyenvana@gmail.com",
  "mat_khau": "123456",
  "ho_ten": "Nguyễn Văn A",
  "so_dien_thoai": "0912345678",
  "dia_chi": "123 Đường ABC, Trà Vinh"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Đăng ký phụ huynh thành công",
  "data": {
    "id": "ph-1732551234567",
    "email": "nguyenvana@gmail.com",
    "ho_ten": "Nguyễn Văn A",
    "vai_tro": "phu_huynh"
  }
}
```

**Validation:**
- ✅ Email phải đúng định dạng
- ✅ Mật khẩu tối thiểu 6 ký tự
- ✅ Họ tên không được để trống
- ✅ Số điện thoại: 10 chữ số, bắt đầu bằng 0

---

### 2️⃣ ĐĂNG KÝ GIA SƯ (SINH VIÊN TVU)

**Endpoint:** `POST /api/auth/register/tutor`

**Request Body:**
```json
{
  "email": "1101210001@st.tvu.edu.vn",
  "mat_khau": "giasu123",
  "ho_ten": "Trần Thị Bích",
  "so_dien_thoai": "0923456789",
  "ma_sinh_vien": "1104220015",
  "ma_lop": "DH22MATH01",
  "khoa": "Khoa Sư phạm",
  "nganh_hoc": "Sư phạm Toán học",
  "nam_hoc": "2022-2026",
  "tieu_de": "Gia sư Toán - Luyện thi THPT Quốc gia",
  "gioi_thieu": "Mình là sinh viên năm 3 ngành Sư phạm Toán...",
  "hoc_phi_gio": 180000,
  "hinh_thuc": "ket_hop",
  "kinh_nghiem": "1 năm dạy kèm lớp 10, 11"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Đăng ký gia sư thành công. Vui lòng chờ admin xác thực hồ sơ sinh viên.",
  "data": {
    "id": "gs-1732551234567",
    "email": "1101210001@st.tvu.edu.vn",
    "ho_ten": "Trần Thị Bích",
    "ma_sinh_vien": "1104220015",
    "vai_tro": "gia_su",
    "trang_thai": "cho_duyet"
  }
}
```

**Validation:**
- ✅ Email phải có định dạng `@st.tvu.edu.vn`
- ✅ Mã sinh viên: 10 chữ số, bắt đầu bằng `11` (theo chuẩn TVU)
- ✅ Học phí từ 50,000 - 500,000 VNĐ/giờ
- ✅ Khoa và Ngành học bắt buộc

**Quy tắc MSSV TVU:**
```
Format: 11AABBCCC
- 11: Mã trường TVU
- AA: Mã ngành (01=CNTT, 02=SPTH, 03=Anh, 04=Toán, ...)
- BB: Năm nhập học (21=2021, 22=2022, ...)
- CCC: Số thứ tự sinh viên

Ví dụ: 1104220015
- 11: TVU
- 04: Ngành Sư phạm Toán
- 22: Khóa 2022
- 0015: Sinh viên thứ 15
```

---

### 3️⃣ ĐĂNG KÝ ADMIN (CHỈ ADMIN TẠO ĐƯỢC)

**Endpoint:** `POST /api/auth/register/admin`  
**Headers:** `Authorization: Bearer {admin_token}`

**Request Body:**
```json
{
  "email": "admin@tutorlink.vn",
  "mat_khau": "admin12345",
  "ho_ten": "Quản Trị Viên",
  "so_dien_thoai": "0901234567"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Tạo tài khoản admin thành công",
  "data": {
    "id": "ad-1732551234567",
    "email": "admin@tutorlink.vn",
    "ho_ten": "Quản Trị Viên",
    "vai_tro": "admin"
  }
}
```

**Validation:**
- ✅ Chỉ admin hiện tại mới tạo được
- ✅ Mật khẩu tối thiểu 8 ký tự

---

## 🔓 ĐĂNG NHẬP

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "1101210001@st.tvu.edu.vn",
  "mat_khau": "giasu123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "user": {
      "id": "gs-001",
      "email": "1101210001@st.tvu.edu.vn",
      "vai_tro": "gia_su",
      "ho_ten": "Nguyễn Văn An",
      "so_dien_thoai": "0901234567",
      "avatar_url": "https://i.pravatar.cc/150?img=12",
      "email_xac_thuc": true,
      "trang_thai": "hoat_dong",
      "ma_sinh_vien": "1101210001",
      "khoa": "Công nghệ thông tin",
      "nganh_hoc": "Công nghệ thông tin",
      "da_xac_thuc": true,
      "tieu_de": "Gia sư CNTT - Lập trình Python, C++",
      "hoc_phi_gio": 200000,
      "danh_gia_trung_binh": 4.8,
      "trang_thai_gia_su": "hoat_dong"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Email hoặc mật khẩu không đúng"
}
```

**Response Error (403) - Tài khoản bị khóa:**
```json
{
  "success": false,
  "message": "Tài khoản đã bị khóa hoặc tạm ngưng"
}
```

**Cookie được set:**
- Name: `token`
- Value: JWT token
- httpOnly: true (bảo mật, không thể truy cập từ JavaScript)
- maxAge: 7 ngày

---

## 🚪 ĐĂNG XUẤT

**Endpoint:** `POST /api/auth/logout`  
**Headers:** `Authorization: Bearer {token}`

**Response Success (200):**
```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

---

## 👤 LẤY THÔNG TIN USER HIỆN TẠI

**Endpoint:** `GET /api/auth/me`  
**Headers:** `Authorization: Bearer {token}`

**Response Success (200) - Gia sư:**
```json
{
  "success": true,
  "data": {
    "id": "gs-001",
    "email": "1101210001@st.tvu.edu.vn",
    "vai_tro": "gia_su",
    "ho_ten": "Nguyễn Văn An",
    "so_dien_thoai": "0901234567",
    "avatar_url": "https://i.pravatar.cc/150?img=12",
    "email_xac_thuc": true,
    "trang_thai": "hoat_dong",
    "tao_luc": "2025-01-15T08:30:00.000Z",
    "ho_so": {
      "ma_sinh_vien": "1101210001",
      "ma_lop": "DH21IT01",
      "khoa": "Công nghệ thông tin",
      "nganh_hoc": "Công nghệ thông tin",
      "nam_hoc": "2021-2025",
      "da_xac_thuc": true,
      "gia_su_id": "uuid-123...",
      "tieu_de": "Gia sư CNTT - Lập trình Python, C++",
      "gioi_thieu": "Sinh viên năm 4...",
      "hoc_phi_gio": 200000,
      "hinh_thuc": "ket_hop",
      "kinh_nghiem": "2 năm",
      "danh_gia_trung_binh": 4.8,
      "so_danh_gia": 15,
      "trang_thai_gia_su": "hoat_dong"
    }
  }
}
```

---

## 🧪 TEST API BẰNG cURL

### 1. Test đăng ký phụ huynh:
```bash
curl -X POST http://localhost:5000/api/auth/register/parent \
-H "Content-Type: application/json" \
-d '{
  "email": "phuhuynh01@gmail.com",
  "mat_khau": "123456",
  "ho_ten": "Nguyễn Văn An",
  "so_dien_thoai": "0912345678",
  "dia_chi": "Trà Vinh"
}'
```

### 2. Test đăng ký gia sư:
```bash
curl -X POST http://localhost:5000/api/auth/register/tutor \
-H "Content-Type: application/json" \
-d '{
  "email": "1109230099@st.tvu.edu.vn",
  "mat_khau": "giasu123",
  "ho_ten": "Lê Thị Mai",
  "so_dien_thoai": "0923456789",
  "ma_sinh_vien": "1109230099",
  "khoa": "Kinh tế",
  "nganh_hoc": "Kinh tế",
  "hoc_phi_gio": 160000
}'
```

### 3. Test đăng nhập:
```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "1101210001@st.tvu.edu.vn",
  "mat_khau": "giasu123"
}'
```

### 4. Test lấy thông tin user (thay {TOKEN}):
```bash
curl -X GET http://localhost:5000/api/auth/me \
-H "Authorization: Bearer {TOKEN}"
```

### 5. Test đăng xuất:
```bash
curl -X POST http://localhost:5000/api/auth/logout \
-H "Authorization: Bearer {TOKEN}"
```

---

## 🔒 MIDDLEWARE BẢO VỆ ROUTES

### Sử dụng trong routes khác:

```javascript
import { authenticate, isAdmin, isTutor, isParent, hasRole } from '../middleware/auth.js';

// Chỉ user đã đăng nhập
router.get('/protected', authenticate, (req, res) => {
  // req.user chứa: { id, email, vai_tro }
});

// Chỉ admin
router.get('/admin-only', authenticate, isAdmin, (req, res) => {});

// Chỉ gia sư
router.get('/tutor-only', authenticate, isTutor, (req, res) => {});

// Chỉ phụ huynh
router.get('/parent-only', authenticate, isParent, (req, res) => {});

// Cho phép nhiều vai trò
router.get('/multi-role', authenticate, hasRole('admin', 'gia_su'), (req, res) => {});
```

---

## 📊 TRẠNG THÁI TÀI KHOẢN

| Vai trò | Trạng thái ban đầu | Cần xác thực email? | Cần admin duyệt? |
|---------|-------------------|---------------------|------------------|
| **Phụ huynh** | `hoat_dong` | ❌ Không | ❌ Không |
| **Gia sư** | `cho_duyet` | ❌ Không | ✅ Có (xác thực MSSV) |
| **Admin** | `hoat_dong` | ✅ Đã xác thực | ❌ Không |

---

## 🚨 MÃ LỖI

| Status Code | Ý nghĩa |
|-------------|---------|
| `200` | Thành công |
| `201` | Tạo mới thành công |
| `400` | Dữ liệu không hợp lệ |
| `401` | Chưa đăng nhập / Token không hợp lệ |
| `403` | Không có quyền truy cập |
| `404` | Không tìm thấy |
| `500` | Lỗi server |

---

## 🎯 LUỒNG ĐĂNG KÝ & ĐĂNG NHẬP

### Phụ huynh:
```
1. POST /api/auth/register/parent
   → Tạo tài khoản ngay
   → Trạng thái: hoat_dong
   
2. POST /api/auth/login
   → Đăng nhập thành công
   → Nhận token
   
3. Sử dụng token để truy cập các API
```

### Gia sư:
```
1. POST /api/auth/register/tutor
   → Tạo tài khoản
   → Trạng thái: cho_duyet
   
2. Admin xác thực MSSV
   → Chuyển trạng thái: hoat_dong
   
3. POST /api/auth/login
   → Đăng nhập thành công
   → Nhận token
```

---

## 💡 GHI CHÚ

- Token có thời hạn 7 ngày
- Token được lưu trong cookie (httpOnly) và có thể gửi qua header
- Sau khi đăng ký gia sư, cần admin xác thực mới được hoạt động đầy đủ
- Email gia sư bắt buộc phải là `@st.tvu.edu.vn`
- MSSV phải đúng 10 chữ số theo chuẩn TVU (bắt đầu bằng 11)
