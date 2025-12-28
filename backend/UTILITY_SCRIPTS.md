# 🔧 Backend Utility Scripts

Các script tiện ích để kiểm tra và quản lý dữ liệu trong quá trình development.

## 📋 Danh sách Scripts

### 1. `check-system.js` ✅ 
**Mục đích**: Kiểm tra toàn bộ dữ liệu hệ thống chi tiết

**Chức năng**:
- Thống kê người dùng theo vai trò và trạng thái
- Thống kê hồ sơ sinh viên và gia sư
- Thống kê môn học, bài đăng, đơn ứng tuyển
- Thống kê đánh giá và rating

**Cách dùng**:
```bash
node backend/check-system.js
```

**Khi nào dùng**: Khi cần xem tổng quan đầy đủ về dữ liệu trong database

---

### 2. `quick-check.js` ✅
**Mục đích**: Kiểm tra nhanh kết nối và dữ liệu cơ bản

**Chức năng**:
- Kiểm tra kết nối MySQL
- Đếm số lượng users, tutors, posts, applications, reviews
- Kiểm tra tài khoản test (admin, tutor)
- Kiểm tra encoding UTF-8

**Cách dùng**:
```bash
node backend/quick-check.js
```

**Khi nào dùng**: Sau khi setup database hoặc khi gặp vấn đề về kết nối

---

### 3. `check-tables.js` ✅
**Mục đích**: Xem cấu trúc bảng trong database

**Chức năng**:
- Hiển thị cấu trúc bảng `don_ung_tuyen`
- Hiển thị cấu trúc bảng `danh_gia`
- Hiển thị cấu trúc bảng `bai_dang`

**Cách dùng**:
```bash
node backend/check-tables.js
```

**Khi nào dùng**: Khi cần kiểm tra schema của bảng hoặc debug vấn đề về cấu trúc dữ liệu

---

### 4. `check-all-tables.js` ✅
**Mục đích**: Xem dữ liệu mẫu từ tất cả các bảng

**Chức năng**:
- Hiển thị 5 records đầu tiên từ mỗi bảng
- Xem nhanh dữ liệu thực tế trong database
- Kiểm tra dữ liệu có được insert đúng không

**Cách dùng**:
```bash
node backend/check-all-tables.js
```

**Khi nào dùng**: Khi cần kiểm tra dữ liệu đã được import vào database chưa

---

### 5. `clear-all-data.js` ⚠️
**Mục đích**: Xóa toàn bộ dữ liệu (giữ lại admin)

**Chức năng**:
- Xóa tất cả users (trừ admin)
- Xóa tất cả hồ sơ sinh viên và gia sư
- Xóa tất cả bài đăng, đơn ứng tuyển, đánh giá
- Giữ lại cấu trúc database và tài khoản admin

**Cách dùng**:
```bash
node backend/clear-all-data.js
```

**Khi nào dùng**: 
- Khi cần reset database về trạng thái ban đầu
- Trước khi import dữ liệu mới

⚠️ **Cảnh báo**: Script này sẽ XÓA toàn bộ dữ liệu (trừ admin)

---

### 6. `auto-setup-complete.js` ✅
**Mục đích**: Tự động tạo dữ liệu demo

**Chức năng**:
- Xóa dữ liệu cũ (đơn ứng tuyển, đánh giá)
- Tạo 15 đơn ứng tuyển mẫu với các trạng thái khác nhau
- Tạo đánh giá cho các gia sư đã được chấp nhận
- Cập nhật rating trung bình cho gia sư

**Cách dùng**:
```bash
node backend/auto-setup-complete.js
```

**Khi nào dùng**: 
- Sau khi setup database mới
- Khi cần reset dữ liệu demo
- Khi test tính năng ứng tuyển và đánh giá

⚠️ **Cảnh báo**: Script này sẽ XÓA toàn bộ dữ liệu trong bảng `don_ung_tuyen` và `danh_gia`

---

## 🎯 Workflow Khuyến Nghị

### Lần đầu setup:
```bash
# 1. Kiểm tra kết nối
node backend/quick-check.js

# 2. Xem cấu trúc bảng
node backend/check-tables.js

# 3. Xem dữ liệu mẫu
node backend/check-all-tables.js

# 4. Kiểm tra chi tiết toàn bộ hệ thống
node backend/check-system.js
```

### Khi cần tạo dữ liệu demo:
```bash
# Tạo đơn ứng tuyển và đánh giá mẫu
node backend/auto-setup-complete.js
```

### Khi cần reset database:
```bash
# Xóa tất cả dữ liệu (giữ admin)
node backend/clear-all-data.js

# Sau đó import lại từ SQL
# Hoặc tạo dữ liệu demo
node backend/auto-setup-complete.js
```

### Khi phát triển:
```bash
# Kiểm tra nhanh trước khi code
node backend/quick-check.js

# Kiểm tra chi tiết sau khi thay đổi
node backend/check-system.js
```

### Khi gặp lỗi:
```bash
# 1. Check kết nối và encoding
node backend/quick-check.js

# 2. Check cấu trúc bảng
node backend/check-tables.js

# 3. Check dữ liệu chi tiết
node backend/check-system.js
```

---

## 📊 Output Ví Dụ

### quick-check.js:
```
🔍 Kiểm tra nhanh hệ thống...

✅ MySQL: Kết nối thành công
✅ Dữ liệu:
   👥 Người dùng: 21
   🎓 Gia sư: 20
   📢 Bài đăng: 5

✅ Tài khoản Admin: OK
✅ Encoding UTF-8: OK
```

### check-system.js:
```
╔══════════════════════════════════════════════════════════╗
║        🔍 KIỂM TRA TOÀN BỘ DỮ LIỆU HỆ THỐNG           ║
╚══════════════════════════════════════════════════════════╝

1️⃣  NGƯỜI DÙNG
─────────────────────────────────────────────────────────
  admin          : 1 tài khoản (1 hoạt động)
  phu_huynh      : 10 tài khoản (10 hoạt động)
  gia_su         : 145 tài khoản (145 hoạt động)
...
```

## 🔒 Lưu Ý Bảo Mật

- ⚠️ Các script này chỉ dùng cho **DEVELOPMENT**
- 🚫 KHÔNG chạy `auto-setup-complete.js` trên **PRODUCTION**
- 🔐 Đảm bảo database credentials được bảo vệ
- 📝 Backup dữ liệu trước khi chạy script xóa/reset

## 🗑️ Scripts Đã Xóa

Các script sau đã bị xóa vì không còn cần thiết:
- ❌ `add-sample-data.js` - Thay thế bởi `auto-setup-complete.js`
- ❌ `create-test-tutor.js` - Dữ liệu test đã có sẵn
- ❌ `fix-encoding.js` - Đã fix encoding trong database
- ❌ `fix-passwords.js` - Đã fix passwords
- ❌ `fix-student-data.js` - Đã fix dữ liệu sinh viên

## 📞 Hỗ Trợ

Nếu gặp lỗi khi chạy scripts:
1. Kiểm tra kết nối database trong `config/database.js`
2. Đảm bảo MySQL đang chạy
3. Kiểm tra credentials (user: tutorlink_user, password: TutorLink@2025)
4. Chạy `quick-check.js` để chẩn đoán
