# 🧪 HƯỚNG DẪN TEST - 2 LOẠI ĐĂNG KÝ

## 🚀 Khởi động

```bash
npm run dev
```

Server: `http://localhost:5173` (hoặc 5174)

---

## ✅ TEST 1: ĐĂNG KÝ PHỤ HUYNH

### Bước 1: Vào trang đăng ký
- Mở: `http://localhost:5173/register`

### Bước 2: Kiểm tra giao diện
**Mong đợi thấy:**
- [ ] Header: "Tạo tài khoản mới"
- [ ] Switcher với 2 option:
  - "👪 Phụ huynh" (active, màu xanh)
  - "🎓 Gia sư (Sinh viên TVU)"
- [ ] Form có 4 fields:
  - Họ và tên *
  - Email *
  - Mật khẩu *
  - Số điện thoại
- [ ] Button: "Đăng ký Phụ huynh"
- [ ] KHÔNG có warning box màu vàng

### Bước 3: Test điền form
```
Họ và tên: Nguyễn Văn A
Email: parent@example.com
Mật khẩu: 123456
SĐT: 0981234567
```

### Bước 4: Submit
- Click "Đăng ký Phụ huynh"
- **Kết quả:** Thông báo thành công (màu xanh)

---

## ✅ TEST 2: ĐĂNG KÝ GIA SƯ

### Bước 1: Vào trang đăng ký
- Mở: `http://localhost:5173/register`

### Bước 2: Chọn "🎓 Gia sư"
- Click vào "🎓 Gia sư (Sinh viên TVU)"

**Mong đợi thấy:**
- [ ] Button chuyển sang màu xanh (active)
- [ ] Xuất hiện **warning box màu vàng**:
  ```
  ⚠️ Đăng ký gia sư yêu cầu xác thực
  Bạn sẽ cần cung cấp MSSV, Mã lớp và Avatar để được phê duyệt
  ```
- [ ] Button đổi text: "Tiếp tục đăng ký Gia sư →"

### Bước 3: Click "Tiếp tục đăng ký Gia sư →"
**Kết quả:**
- [ ] URL đổi thành `/register-tutor`
- [ ] Trang mới với form 4 bước

---

## ✅ TEST 3: FORM ĐĂNG KÝ GIA SƯ (Multi-step)

### URL: `http://localhost:5173/register-tutor`

### Kiểm tra header:
- [ ] "Đăng ký làm gia sư"
- [ ] "⚠️ Chỉ dành cho sinh viên TVU"
- [ ] Warning box vàng: "Yêu cầu: MSSV và Mã lớp để xác thực"

### Kiểm tra Progress Bar:
```
[1]───[2]───[3]───[4]
 ✓    ○    ○    ○
```
- [ ] Step 1 active (màu xanh)
- [ ] Step 2, 3, 4 inactive (màu xám)

---

### BƯỚC 1: Thông tin tài khoản

**Điền:**
```
Email: tutor@tvu.edu.vn
Mật khẩu: 123456
Xác nhận mật khẩu: 123456
```

**Test validation:**
- [ ] Email sai format → Hiển thị lỗi
- [ ] Mật khẩu < 6 ký tự → Hiển thị lỗi
- [ ] Mật khẩu không khớp → Hiển thị lỗi

**Click "Tiếp theo":**
- [ ] Chuyển sang Step 2
- [ ] Progress bar: [✓]───[2]───[3]───[4]

---

### BƯỚC 2: Thông tin sinh viên TVU

**Kiểm tra:**
- [ ] Info box xanh: "Admin sẽ xác thực MSSV..."
- [ ] Input MSSV có hint: "9 chữ số, ví dụ: 110122086"
- [ ] Input Mã lớp có hint: "Ví dụ: DH21IT02, DH22EN01"

**Điền:**
```
Họ và tên: Nguyễn Văn B
MSSV: 110122086
Mã lớp: DH21IT02
Khoa: Khoa Kỹ thuật và Công nghệ
Ngành học: Công nghệ Thông tin
Năm học: 2021-2025
```

**Test validation:**
- [ ] MSSV không đủ 9 số → Lỗi
- [ ] MSSV có chữ cái → Lỗi
- [ ] Bỏ trống → Lỗi

**Click "Tiếp theo":**
- [ ] Progress: [✓]───[✓]───[3]───[4]

---

### BƯỚC 3: Ảnh đại diện

**Kiểm tra:**
- [ ] Placeholder icon người
- [ ] Text: "Chưa có ảnh đại diện"
- [ ] Button "Chọn ảnh"
- [ ] Hint: "Ảnh chân dung rõ mặt, dung lượng tối đa 2MB"

**Upload ảnh:**
- Click "Chọn ảnh"
- Chọn file ảnh (JPG/PNG)

**Kết quả:**
- [ ] Hiển thị preview ảnh (hình tròn)
- [ ] Button đổi thành "Đổi ảnh"

**Click "Tiếp theo":**
- [ ] Progress: [✓]───[✓]───[✓]───[4]

---

### BƯỚC 4: Thông tin gia sư

**Chọn môn học** (checkboxes):
- [ ] Toán ✓
- [ ] Lập trình ✓

**Chọn cấp độ:**
- [ ] THCS ✓
- [ ] THPT ✓

**Điền:**
```
Kinh nghiệm: 2 năm
Học phí: 150.000 VND/buổi
Hình thức: Kết hợp
Giới thiệu: Sinh viên năm 3 CNTT...
```

**Click "Hoàn thành đăng ký":**

**Kết quả - Alert hiển thị:**
```
✅ Đăng ký thành công!

📋 Thông tin đã gửi:
- MSSV: 110122086
- Mã lớp: DH21IT02
- Khoa: Khoa Kỹ thuật và Công nghệ

⏳ Bước tiếp theo:
Admin sẽ xác thực MSSV trong vòng 24-48 giờ...
```

---

## ✅ TEST 4: NAVBAR BUTTON

### Kiểm tra Navbar:
- [ ] Button "🎓 Đăng ký Gia sư" (màu vàng)
- [ ] Vị trí: Bên trái "Đăng nhập"

### Click button:
- [ ] Redirect đến `/register-tutor`
- [ ] Form 4 bước hiển thị đúng

---

## ✅ TEST 5: TUTOR CARD

### Vào trang tìm gia sư:
- URL: `http://localhost:5173/tutors`

### Kiểm tra mỗi card:

**Nguyễn Thị Minh Anh:**
- [ ] Avatar: Hình ảnh thật (không phải chữ cái)
- [ ] Tên có icon ✓ màu xanh
- [ ] Dòng dưới tên: "MSSV: 110122086 • DH21CS01"

**Trần Văn Bảo:**
- [ ] Avatar: Hình ảnh thật
- [ ] Icon ✓ xanh
- [ ] MSSV: 110120123 • DH21IT02

**Tất cả 5 cards:**
- [ ] Có avatar thật
- [ ] Có badge verified ✓
- [ ] Có hiển thị MSSV + Mã lớp

---

## ✅ TEST 6: RESPONSIVE

### Mobile view (F12 → Mobile):

**Navbar:**
- [ ] Hamburger menu hoạt động
- [ ] Button "🎓 Đăng ký Gia sư" hiển thị

**Form đăng ký:**
- [ ] Progress steps hiển thị dọc (mobile)
- [ ] Form fields full width
- [ ] Buttons stack vertically

**Tutor cards:**
- [ ] Cards hiển thị 1 cột
- [ ] Avatar, badge, MSSV đều rõ ràng

---

## 🐛 Bug Checklist

### Không có lỗi:
- [ ] Console: No errors
- [ ] TypeScript: No type errors
- [ ] Links: All working
- [ ] Images: Load properly
- [ ] Styles: Applied correctly

---

## 📸 Screenshots cần chụp

1. `/register` - Chọn Phụ huynh
2. `/register` - Chọn Gia sư (có warning)
3. `/register-tutor` - Step 1
4. `/register-tutor` - Step 2 (có MSSV)
5. `/register-tutor` - Step 3 (upload avatar)
6. `/register-tutor` - Step 4 (thông tin GS)
7. `/tutors` - Tutor cards với avatar + badge
8. Navbar - Button vàng "Đăng ký Gia sư"

---

## ✅ Kết quả mong đợi

Tất cả test cases PASS:
- ✅ Phụ huynh đăng ký đơn giản
- ✅ Gia sư redirect đến form 4 bước
- ✅ Validation hoạt động
- ✅ Progress bar cập nhật
- ✅ Avatar upload + preview
- ✅ Submit hiển thị thông báo đúng
- ✅ Navbar button hoạt động
- ✅ Tutor cards hiển thị badge + MSSV
- ✅ Responsive mobile OK
- ✅ No console errors

---

## 🎉 Demo Script

```
1. Mở http://localhost:5173
2. Click "Đăng ký" ở navbar
3. Chọn "🎓 Gia sư" → Thấy warning
4. Click "Tiếp tục đăng ký Gia sư →"
5. Điền form 4 bước
6. Submit → Thấy thông báo thành công
7. Vào /tutors → Thấy badge ✓ và MSSV
```

Hoàn thành! 🚀
