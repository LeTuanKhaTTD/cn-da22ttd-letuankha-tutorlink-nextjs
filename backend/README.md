# Backend API - TutorLink TVU

Backend API cho hệ thống kết nối gia sư sinh viên TVU với phụ huynh.

## 🚀 Khởi động Backend

```bash
# Chạy server (production)
npm run server

# Chạy server với auto-reload (development)
npm run server:dev
```

Server sẽ chạy tại: **http://localhost:5000**

## 📡 API Endpoints

### 1. Health Check
```
GET /api/health
```
Kiểm tra trạng thái server.

**Response:**
```json
{
  "success": true,
  "message": "TutorLink API đang hoạt động",
  "timestamp": "2025-11-25T10:00:00.000Z"
}
```

### 2. Lấy danh sách gia sư
```
GET /api/tutors
```

**Query Parameters:**
- `nganh` (string): Lọc theo ngành học (VD: "Công nghệ thông tin")
- `minPrice` (number): Giá tối thiểu (VD: 150000)
- `maxPrice` (number): Giá tối đa (VD: 200000)
- `rating` (number): Đánh giá tối thiểu (VD: 4.5)
- `page` (number): Số trang (mặc định: 1)
- `limit` (number): Số kết quả mỗi trang (mặc định: 10)

**Ví dụ:**
```
GET /api/tutors?nganh=Công nghệ thông tin&minPrice=150000&rating=4.5&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "gs-001",
      "ho_ten": "Nguyễn Văn An",
      "email": "1101210001@st.tvu.edu.vn",
      "so_dien_thoai": "0901234567",
      "avatar_url": "https://i.pravatar.cc/150?img=12",
      "ma_sinh_vien": "1101210001",
      "ma_lop": "DH21IT01",
      "khoa": "Công nghệ thông tin",
      "nganh_hoc": "Công nghệ thông tin",
      "nam_hoc": "2021-2025",
      "da_xac_thuc": 1,
      "tieu_de": "Gia sư CNTT - Lập trình Python, C++",
      "gioi_thieu": "Sinh viên năm 4 chuyên ngành CNTT...",
      "hoc_phi_gio": 200000,
      "hinh_thuc": "ket_hop",
      "kinh_nghiem": "2 năm",
      "danh_gia_trung_binh": 4.8,
      "so_danh_gia": 15,
      "trang_thai": "hoat_dong"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 10,
    "totalPages": 1
  }
}
```

### 3. Lấy thông tin chi tiết gia sư
```
GET /api/tutors/:id
```

**Parameters:**
- `id` (string): ID của gia sư (VD: "gs-001")

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "gs-001",
    "ho_ten": "Nguyễn Văn An",
    "email": "1101210001@st.tvu.edu.vn",
    "so_dien_thoai": "0901234567",
    "avatar_url": "https://i.pravatar.cc/150?img=12",
    "tao_luc": "2025-01-15T08:30:00.000Z",
    "ma_sinh_vien": "1101210001",
    "ma_lop": "DH21IT01",
    "khoa": "Công nghệ thông tin",
    "nganh_hoc": "Công nghệ thông tin",
    "nam_hoc": "2021-2025",
    "da_xac_thuc": 1,
    "tieu_de": "Gia sư CNTT - Lập trình Python, C++",
    "gioi_thieu": "Sinh viên năm 4 chuyên ngành CNTT...",
    "hoc_phi_gio": 200000,
    "hinh_thuc": "ket_hop",
    "kinh_nghiem": "2 năm",
    "danh_gia_trung_binh": 4.8,
    "so_danh_gia": 15,
    "trang_thai": "hoat_dong",
    "mon_hoc": [
      {
        "id": 1,
        "ten_mon": "Toán",
        "trinh_do": "Lớp 10, 11, 12"
      }
    ]
  }
}
```

### 4. Lấy danh sách ngành học
```
GET /api/tutors/majors
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "nganh_hoc": "Công nghệ thông tin",
      "so_luong": 2
    },
    {
      "nganh_hoc": "Kinh tế",
      "so_luong": 1
    }
  ]
}
```

### 5. Thống kê gia sư
```
GET /api/tutors/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tong_gia_su": 10,
    "gia_trung_binh": 175500,
    "danh_gia_trung_binh": 4.57,
    "so_nganh": 10
  }
}
```

## 🗄️ Cấu hình Database

File `.env`:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=tutorlink_user
DB_PASSWORD=TutorLink@2025
DB_NAME=tutorlink_db
DB_CHARSET=utf8mb4

CORS_ORIGIN=http://localhost:5173
```

## 📁 Cấu trúc Backend

```
backend/
├── config/
│   └── database.js          # Cấu hình kết nối MySQL
├── controllers/
│   └── tutorController.js   # Xử lý logic nghiệp vụ
├── routes/
│   └── tutorRoutes.js       # Định nghĩa API routes
└── server.js                # Entry point của server
```

## 🧪 Test API

### Sử dụng cURL:
```bash
# Health check
curl http://localhost:5000/api/health

# Lấy danh sách gia sư
curl http://localhost:5000/api/tutors

# Lấy gia sư theo ngành
curl "http://localhost:5000/api/tutors?nganh=Công%20nghệ%20thông%20tin"

# Lấy thông tin chi tiết
curl http://localhost:5000/api/tutors/gs-001
```

### Sử dụng Frontend:
```javascript
// src/api/tutors.api.ts
const response = await fetch('http://localhost:5000/api/tutors?page=1&limit=10');
const data = await response.json();
console.log(data);
```

## 🔒 CORS Configuration

Server cho phép request từ frontend Vite (http://localhost:5173). 

Để thêm origin khác, sửa trong `backend/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```
