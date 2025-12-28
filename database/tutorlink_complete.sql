-- ============================================
-- TUTORLINK DATABASE - SCHEMA + DỮ LIỆU MẪU
-- Hệ thống kết nối gia sư - Đại học Trà Vinh
-- ============================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa database cũ nếu có và tạo mới
DROP DATABASE IF EXISTS tutorlink_db;
CREATE DATABASE tutorlink_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tutorlink_db;

-- ============================================
-- PHẦN 1: TẠO CÁC BẢNG (SCHEMA)
-- ============================================

-- Bảng 1: Người dùng
CREATE TABLE nguoi_dung (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  mat_khau VARCHAR(255) NOT NULL,
  vai_tro ENUM('phu_huynh', 'gia_su', 'admin') NOT NULL,
  ho_ten VARCHAR(255) NOT NULL,
  so_dien_thoai VARCHAR(20),
  avatar_url VARCHAR(500),
  email_xac_thuc BOOLEAN DEFAULT FALSE,
  trang_thai ENUM('hoat_dong', 'tam_khoa', 'khoa') DEFAULT 'hoat_dong',
  tao_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cap_nhat_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_vai_tro (vai_tro),
  INDEX idx_trang_thai (trang_thai)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng 2: Hồ sơ sinh viên TVU
CREATE TABLE ho_so_sinh_vien (
  id VARCHAR(36) PRIMARY KEY,
  nguoi_dung_id VARCHAR(36) NOT NULL,
  ma_sinh_vien VARCHAR(10) UNIQUE NOT NULL,
  ma_lop VARCHAR(20) NOT NULL,
  khoa VARCHAR(100),
  nganh_hoc VARCHAR(100),
  nam_hoc VARCHAR(20),
  da_xac_thuc BOOLEAN DEFAULT FALSE,
  tao_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cap_nhat_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
  INDEX idx_ma_sinh_vien (ma_sinh_vien),
  INDEX idx_nguoi_dung (nguoi_dung_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng 3: Hồ sơ gia sư
CREATE TABLE ho_so_gia_su (
  id VARCHAR(36) PRIMARY KEY,
  nguoi_dung_id VARCHAR(36) NOT NULL,
  ho_so_sinh_vien_id VARCHAR(36) NOT NULL,
  tieu_de VARCHAR(255),
  gioi_thieu TEXT,
  hoc_phi_gio DECIMAL(10,2),
  hinh_thuc ENUM('online', 'offline', 'ket_hop') DEFAULT 'ket_hop',
  kinh_nghiem VARCHAR(255),
  danh_gia_trung_binh DECIMAL(2,1) DEFAULT 0.0,
  so_danh_gia INT DEFAULT 0,
  trang_thai ENUM('hoat_dong', 'tam_ngung') DEFAULT 'hoat_dong',
  tao_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cap_nhat_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
  FOREIGN KEY (ho_so_sinh_vien_id) REFERENCES ho_so_sinh_vien(id) ON DELETE CASCADE,
  INDEX idx_nguoi_dung (nguoi_dung_id),
  INDEX idx_trang_thai (trang_thai),
  INDEX idx_hoc_phi (hoc_phi_gio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng 4: Môn học
CREATE TABLE mon_hoc (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ten_mon VARCHAR(100) NOT NULL,
  mo_ta TEXT,
  tao_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ten_mon (ten_mon)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng 5: Gia sư - Môn học (Many-to-Many)
CREATE TABLE gia_su_mon_hoc (
  id VARCHAR(36) PRIMARY KEY,
  gia_su_id VARCHAR(36) NOT NULL,
  mon_hoc_id INT NOT NULL,
  cap_do JSON COMMENT 'Cấp độ dạy: ["Tiểu học","THCS","THPT"]',
  trinh_do VARCHAR(100),
  tao_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gia_su_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
  FOREIGN KEY (mon_hoc_id) REFERENCES mon_hoc(id) ON DELETE CASCADE,
  INDEX idx_gia_su (gia_su_id),
  INDEX idx_mon_hoc (mon_hoc_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng 6: Bài đăng tìm gia sư
CREATE TABLE bai_dang (
  id VARCHAR(36) PRIMARY KEY,
  phu_huynh_id VARCHAR(36) NOT NULL,
  mon_hoc_id INT NOT NULL,
  tieu_de VARCHAR(255) NOT NULL,
  lop VARCHAR(50),
  luong DECIMAL(10,2),
  dia_chi VARCHAR(255),
  mo_ta TEXT,
  yeu_cau TEXT,
  tan_suat VARCHAR(100),
  trang_thai ENUM('mo', 'dong', 'het_han') DEFAULT 'mo',
  so_luot_xem INT DEFAULT 0,
  tao_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cap_nhat_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  het_han_luc TIMESTAMP NULL,
  FOREIGN KEY (phu_huynh_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
  FOREIGN KEY (mon_hoc_id) REFERENCES mon_hoc(id) ON DELETE CASCADE,
  INDEX idx_phu_huynh (phu_huynh_id),
  INDEX idx_mon_hoc (mon_hoc_id),
  INDEX idx_trang_thai (trang_thai)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng 7: Đơn ứng tuyển
CREATE TABLE don_ung_tuyen (
  id VARCHAR(36) PRIMARY KEY,
  gia_su_id VARCHAR(36) NOT NULL,
  bai_dang_id VARCHAR(36) NOT NULL,
  loi_nhan TEXT,
  trang_thai ENUM('cho', 'chap_nhan', 'tu_choi') DEFAULT 'cho',
  ghi_chu_phu_huynh TEXT,
  tao_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cap_nhat_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (gia_su_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
  FOREIGN KEY (bai_dang_id) REFERENCES bai_dang(id) ON DELETE CASCADE,
  INDEX idx_gia_su (gia_su_id),
  INDEX idx_bai_dang (bai_dang_id),
  INDEX idx_trang_thai (trang_thai)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng 8: Đánh giá gia sư
CREATE TABLE danh_gia (
  id VARCHAR(36) PRIMARY KEY,
  gia_su_id VARCHAR(36) NOT NULL,
  phu_huynh_id VARCHAR(36) NOT NULL,
  don_ung_tuyen_id VARCHAR(36),
  diem_so INT NOT NULL CHECK (diem_so >= 1 AND diem_so <= 5),
  nhan_xet TEXT,
  tao_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cap_nhat_luc TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (gia_su_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
  FOREIGN KEY (phu_huynh_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
  FOREIGN KEY (don_ung_tuyen_id) REFERENCES don_ung_tuyen(id) ON DELETE SET NULL,
  INDEX idx_gia_su (gia_su_id),
  INDEX idx_phu_huynh (phu_huynh_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PHẦN 2: THÊM DỮ LIỆU MẪU
-- ============================================

-- 1. Tài khoản Admin
INSERT INTO nguoi_dung (id, email, mat_khau, vai_tro, ho_ten, so_dien_thoai, avatar_url, email_xac_thuc, trang_thai) 
VALUES ('admin-001', 'admin@tutorlink.vn', '$2b$10$46pEEhDLJuTgRumX7jwwHehl4S1oXhPGggKi9Y.MDbPUcxp5cRq6G', 'admin', 'Admin TutorLink', '0123456789', NULL, TRUE, 'hoat_dong');

-- 2. Môn học (10 môn từ lớp 1-12)
INSERT INTO mon_hoc (id, ten_mon, mo_ta) VALUES
(1, 'Toán', 'Toán học từ lớp 1 đến lớp 12'),
(2, 'Ngữ Văn', 'Văn học và Tiếng Việt'),
(3, 'Tiếng Anh', 'Ngoại ngữ Tiếng Anh'),
(4, 'Vật Lý', 'Vật lý THCS và THPT'),
(5, 'Hóa Học', 'Hóa học THCS và THPT'),
(6, 'Sinh Học', 'Sinh học THCS và THPT'),
(7, 'Lịch Sử', 'Lịch sử Việt Nam và Thế giới'),
(8, 'Địa Lý', 'Địa lý Việt Nam và Thế giới'),
(9, 'Tin Học', 'Tin học và Công nghệ thông tin'),
(10, 'GDCD', 'Giáo dục công dân');

-- 3. 20 Gia sư (mỗi môn 2 người)
INSERT INTO nguoi_dung (id, email, mat_khau, vai_tro, ho_ten, so_dien_thoai, trang_thai) VALUES
('gs-001', '1101210001@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Nguyễn Văn An', '0901234501', 'hoat_dong'),
('gs-002', '1101210002@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Trần Thị Bình', '0901234502', 'hoat_dong'),
('gs-003', '1101210003@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Lê Minh Cường', '0901234503', 'hoat_dong'),
('gs-004', '1101210004@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Phạm Thu Dung', '0901234504', 'hoat_dong'),
('gs-005', '1101210005@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Võ Hoàng Em', '0901234505', 'hoat_dong'),
('gs-006', '1101210006@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Huỳnh Ngọc Hân', '0901234506', 'hoat_dong'),
('gs-007', '1101210007@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Phan Quốc Huy', '0901234507', 'hoat_dong'),
('gs-008', '1101210008@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Đặng Khánh Linh', '0901234508', 'hoat_dong'),
('gs-009', '1101210009@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Ngô Thanh Long', '0901234509', 'hoat_dong'),
('gs-010', '1101210010@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Bùi Minh Châu', '0901234510', 'hoat_dong'),
('gs-011', '1101210011@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Trịnh Văn Nam', '0901234511', 'hoat_dong'),
('gs-012', '1101210012@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Dương Thị Oanh', '0901234512', 'hoat_dong'),
('gs-013', '1101210013@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Lý Minh Phát', '0901234513', 'hoat_dong'),
('gs-014', '1101210014@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Mai Thu Quỳnh', '0901234514', 'hoat_dong'),
('gs-015', '1101210015@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Đinh Văn Sang', '0901234515', 'hoat_dong'),
('gs-016', '1101210016@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Hồ Thị Tâm', '0901234516', 'hoat_dong'),
('gs-017', '1101210017@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Cao Minh Tuấn', '0901234517', 'hoat_dong'),
('gs-018', '1101210018@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Vũ Ngọc Uyên', '0901234518', 'hoat_dong'),
('gs-019', '1101210019@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'Tô Văn Vinh', '0901234519', 'hoat_dong'),
('gs-020', '1101210020@st.tvu.edu.vn', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'gia_su', 'La Thị Xuân', '0901234520', 'hoat_dong');

-- 4. Hồ sơ sinh viên
INSERT INTO ho_so_sinh_vien (id, nguoi_dung_id, ma_sinh_vien, ma_lop, khoa, nganh_hoc, nam_hoc, da_xac_thuc) VALUES
('hsv-001', 'gs-001', '1101210001', 'DH21SP01', 'Khoa Sư Phạm', 'Sư phạm Toán', '2021-2025', 1),
('hsv-002', 'gs-002', '1101210002', 'DH21SP01', 'Khoa Sư Phạm', 'Sư phạm Toán', '2021-2025', 1),
('hsv-003', 'gs-003', '1101210003', 'DH21SP02', 'Khoa Sư Phạm', 'Sư phạm Ngữ Văn', '2021-2025', 1),
('hsv-004', 'gs-004', '1101210004', 'DH21SP02', 'Khoa Sư Phạm', 'Sư phạm Ngữ Văn', '2021-2025', 1),
('hsv-005', 'gs-005', '1101210005', 'DH21NN01', 'Khoa Ngoại Ngữ', 'Sư phạm Tiếng Anh', '2021-2025', 1),
('hsv-006', 'gs-006', '1101210006', 'DH21NN01', 'Khoa Ngoại Ngữ', 'Sư phạm Tiếng Anh', '2021-2025', 1),
('hsv-007', 'gs-007', '1101210007', 'DH21KT01', 'Khoa Khoa học Tự nhiên', 'Sư phạm Vật Lý', '2021-2025', 1),
('hsv-008', 'gs-008', '1101210008', 'DH21KT01', 'Khoa Khoa học Tự nhiên', 'Sư phạm Vật Lý', '2021-2025', 1),
('hsv-009', 'gs-009', '1101210009', 'DH21KT02', 'Khoa Khoa học Tự nhiên', 'Sư phạm Hóa Học', '2021-2025', 1),
('hsv-010', 'gs-010', '1101210010', 'DH21KT02', 'Khoa Khoa học Tự nhiên', 'Sư phạm Hóa Học', '2021-2025', 1),
('hsv-011', 'gs-011', '1101210011', 'DH21KT03', 'Khoa Khoa học Tự nhiên', 'Sư phạm Sinh Học', '2021-2025', 1),
('hsv-012', 'gs-012', '1101210012', 'DH21KT03', 'Khoa Khoa học Tự nhiên', 'Sư phạm Sinh Học', '2021-2025', 1),
('hsv-013', 'gs-013', '1101210013', 'DH21XH01', 'Khoa Khoa học Xã hội', 'Sư phạm Lịch Sử', '2021-2025', 1),
('hsv-014', 'gs-014', '1101210014', 'DH21XH01', 'Khoa Khoa học Xã hội', 'Sư phạm Lịch Sử', '2021-2025', 1),
('hsv-015', 'gs-015', '1101210015', 'DH21XH02', 'Khoa Khoa học Xã hội', 'Sư phạm Địa Lý', '2021-2025', 1),
('hsv-016', 'gs-016', '1101210016', 'DH21XH02', 'Khoa Khoa học Xã hội', 'Sư phạm Địa Lý', '2021-2025', 1),
('hsv-017', 'gs-017', '1101210017', 'DH21CN01', 'Khoa Công Nghệ', 'Công nghệ Thông tin', '2021-2025', 1),
('hsv-018', 'gs-018', '1101210018', 'DH21CN01', 'Khoa Công Nghệ', 'Công nghệ Thông tin', '2021-2025', 1),
('hsv-019', 'gs-019', '1101210019', 'DH21SP03', 'Khoa Sư Phạm', 'Sư phạm GDCD', '2021-2025', 1),
('hsv-020', 'gs-020', '1101210020', 'DH21SP03', 'Khoa Sư Phạm', 'Sư phạm GDCD', '2021-2025', 1);

-- 5. Hồ sơ gia sư
INSERT INTO ho_so_gia_su (id, nguoi_dung_id, ho_so_sinh_vien_id, tieu_de, gioi_thieu, hoc_phi_gio, hinh_thuc, kinh_nghiem, danh_gia_trung_binh, so_danh_gia, trang_thai) VALUES
('hsg-001', 'gs-001', 'hsv-001', 'Gia sư Toán - Nguyễn Văn An', 'Sinh viên Sư phạm Toán năm 4 tại ĐH Trà Vinh. 2 năm kinh nghiệm dạy Toán các cấp tại Trà Vinh. Phương pháp dễ hiểu, tận tâm.', 120000, 'ket_hop', '2 năm', 4.8, 15, 'hoat_dong'),
('hsg-002', 'gs-002', 'hsv-002', 'Gia sư Toán - Trần Thị Bình', 'Sinh viên năm 3 Sư phạm Toán. Đã dạy nhiều học sinh đạt kết quả cao. Kiên nhẫn, nhiệt tình.', 100000, 'ket_hop', '1 năm', 4.7, 12, 'hoat_dong'),
('hsg-003', 'gs-003', 'hsv-003', 'Gia sư Ngữ Văn - Lê Minh Cường', 'Sinh viên Sư phạm Ngữ Văn năm 4. Giúp học sinh hiểu sâu văn học, viết bài hay.', 110000, 'ket_hop', '2 năm', 4.9, 18, 'hoat_dong'),
('hsg-004', 'gs-004', 'hsv-004', 'Gia sư Ngữ Văn - Phạm Thu Dung', 'Đam mê văn học. Phương pháp học văn hiệu quả, giúp học sinh yêu thích môn Văn.', 100000, 'ket_hop', '1 năm', 4.6, 10, 'hoat_dong'),
('hsg-005', 'gs-005', 'hsv-005', 'Gia sư Tiếng Anh - Võ Hoàng Em', 'Sinh viên năm 4 Sư phạm Anh. IELTS 7.0. Kinh nghiệm dạy giao tiếp và luyện thi THPT.', 150000, 'ket_hop', '3 năm', 4.9, 25, 'hoat_dong'),
('hsg-006', 'gs-006', 'hsv-006', 'Gia sư Tiếng Anh - Huỳnh Ngọc Hân', 'Chuyên dạy Tiếng Anh giao tiếp và nền tảng. Tận tâm, kiên nhẫn.', 130000, 'ket_hop', '2 năm', 4.7, 16, 'hoat_dong'),
('hsg-007', 'gs-007', 'hsv-007', 'Gia sư Vật Lý - Phan Quốc Huy', 'Sinh viên Sư phạm Vật Lý năm 4. Giỏi giải thích hiện tượng vật lý thực tế.', 130000, 'ket_hop', '2 năm', 4.8, 14, 'hoat_dong'),
('hsg-008', 'gs-008', 'hsv-008', 'Gia sư Vật Lý - Đặng Khánh Linh', 'Kinh nghiệm dạy Vật Lý THCS-THPT. Phương pháp logic, dễ hiểu.', 120000, 'ket_hop', '1 năm', 4.6, 11, 'hoat_dong'),
('hsg-009', 'gs-009', 'hsv-009', 'Gia sư Hóa Học - Ngô Thanh Long', 'Sinh viên Sư phạm Hóa năm 4. Giỏi giải thích phản ứng và phương pháp làm bài nhanh.', 125000, 'ket_hop', '2 năm', 4.7, 13, 'hoat_dong'),
('hsg-010', 'gs-010', 'hsv-010', 'Gia sư Hóa Học - Bùi Minh Châu', 'Truyền đạt Hóa học dễ hiểu. Giúp học sinh không còn sợ môn Hóa.', 110000, 'ket_hop', '1 năm', 4.5, 9, 'hoat_dong'),
('hsg-011', 'gs-011', 'hsv-011', 'Gia sư Sinh Học - Trịnh Văn Nam', 'Sinh viên năm 4 Sư phạm Sinh. Giúp học sinh hiểu sâu về cơ thể sống.', 115000, 'ket_hop', '2 năm', 4.6, 12, 'hoat_dong'),
('hsg-012', 'gs-012', 'hsv-012', 'Gia sư Sinh Học - Dương Thị Oanh', 'Đam mê sinh học. Phương pháp sinh động, kết hợp lý thuyết-thực hành.', 105000, 'ket_hop', '1 năm', 4.5, 8, 'hoat_dong'),
('hsg-013', 'gs-013', 'hsv-013', 'Gia sư Lịch Sử - Lý Minh Phát', 'Sinh viên Sư phạm Lịch sử năm 4. Kể chuyện sinh động, giúp học sinh nhớ lâu.', 100000, 'ket_hop', '2 năm', 4.7, 15, 'hoat_dong'),
('hsg-014', 'gs-014', 'hsv-014', 'Gia sư Lịch Sử - Mai Thu Quỳnh', 'Phương pháp học sử bằng sơ đồ tư duy. Nhớ nhanh, hiểu sâu.', 95000, 'ket_hop', '1 năm', 4.6, 10, 'hoat_dong'),
('hsg-015', 'gs-015', 'hsv-015', 'Gia sư Địa Lý - Đinh Văn Sang', 'Sinh viên năm 4 Sư phạm Địa. Giỏi sử dụng bản đồ và hình ảnh.', 105000, 'ket_hop', '2 năm', 4.7, 11, 'hoat_dong'),
('hsg-016', 'gs-016', 'hsv-016', 'Gia sư Địa Lý - Hồ Thị Tâm', 'Kinh nghiệm dạy Địa tự nhiên và kinh tế. Thực tế, gần gũi.', 100000, 'ket_hop', '1 năm', 4.5, 9, 'hoat_dong'),
('hsg-017', 'gs-017', 'hsv-017', 'Gia sư Tin Học - Cao Minh Tuấn', 'Sinh viên CNTT năm 4. Dạy Tin văn phòng, lập trình cơ bản.', 140000, 'ket_hop', '2 năm', 4.8, 17, 'hoat_dong'),
('hsg-018', 'gs-018', 'hsv-018', 'Gia sư Tin Học - Vũ Ngọc Uyên', 'Kinh nghiệm dạy Tin cho mọi lứa tuổi. Thành thạo máy tính.', 130000, 'ket_hop', '1 năm', 4.6, 12, 'hoat_dong'),
('hsg-019', 'gs-019', 'hsv-019', 'Gia sư GDCD - Tô Văn Vinh', 'Sinh viên Sư phạm GDCD năm 4. Giúp học sinh hiểu đạo đức, pháp luật.', 90000, 'ket_hop', '1 năm', 4.5, 7, 'hoat_dong'),
('hsg-020', 'gs-020', 'hsv-020', 'Gia sư GDCD - La Thị Xuân', 'Dạy GDCD thực tế, gần gũi. Áp dụng vào cuộc sống.', 85000, 'ket_hop', '1 năm', 4.4, 6, 'hoat_dong');

-- 6. Gia sư - Môn học (với cấp độ)
INSERT INTO gia_su_mon_hoc (id, gia_su_id, mon_hoc_id, cap_do, trinh_do) VALUES
('gsm-001', 'gs-001', 1, '["Tiểu học","THCS","THPT"]', 'Sinh viên năm 4'),
('gsm-002', 'gs-002', 1, '["Tiểu học","THCS","THPT"]', 'Sinh viên năm 3'),
('gsm-003', 'gs-003', 2, '["Tiểu học","THCS","THPT"]', 'Sinh viên năm 4'),
('gsm-004', 'gs-004', 2, '["Tiểu học","THCS","THPT"]', 'Sinh viên năm 3'),
('gsm-005', 'gs-005', 3, '["Tiểu học","THCS","THPT"]', 'IELTS 7.0'),
('gsm-006', 'gs-006', 3, '["Tiểu học","THCS","THPT"]', 'Sinh viên năm 3'),
('gsm-007', 'gs-007', 4, '["THCS","THPT"]', 'Sinh viên năm 4'),
('gsm-008', 'gs-008', 4, '["THCS","THPT"]', 'Sinh viên năm 3'),
('gsm-009', 'gs-009', 5, '["THCS","THPT"]', 'Sinh viên năm 4'),
('gsm-010', 'gs-010', 5, '["THCS","THPT"]', 'Sinh viên năm 3'),
('gsm-011', 'gs-011', 6, '["THCS","THPT"]', 'Sinh viên năm 4'),
('gsm-012', 'gs-012', 6, '["THCS","THPT"]', 'Sinh viên năm 3'),
('gsm-013', 'gs-013', 7, '["THCS","THPT"]', 'Sinh viên năm 4'),
('gsm-014', 'gs-014', 7, '["THCS","THPT"]', 'Sinh viên năm 3'),
('gsm-015', 'gs-015', 8, '["THCS","THPT"]', 'Sinh viên năm 4'),
('gsm-016', 'gs-016', 8, '["THCS","THPT"]', 'Sinh viên năm 3'),
('gsm-017', 'gs-017', 9, '["THCS","THPT"]', 'Sinh viên năm 4'),
('gsm-018', 'gs-018', 9, '["THCS","THPT"]', 'Sinh viên năm 3'),
('gsm-019', 'gs-019', 10, '["THCS","THPT"]', 'Sinh viên năm 4'),
('gsm-020', 'gs-020', 10, '["THCS","THPT"]', 'Sinh viên năm 3');

-- 7. Bài đăng mẫu (5 bài)
INSERT INTO bai_dang (id, phu_huynh_id, mon_hoc_id, tieu_de, lop, luong, dia_chi, mo_ta, yeu_cau, tan_suat, trang_thai, so_luot_xem) VALUES
('bd-001', 'admin-001', 1, 'Cần gia sư Toán lớp 8 tại TP. Trà Vinh', 'Lớp 8', 150000, 'Phường 1, TP. Trà Vinh', 'Con tôi học lớp 8, cần gia sư Toán ôn thi cuối năm.', 'Gia sư kiên nhẫn, có kinh nghiệm', 'Thứ 2, 4, 6 - 18h-19h30', 'mo', 15),
('bd-002', 'admin-001', 3, 'Tìm gia sư Tiếng Anh lớp 10 tại Càng Long', 'Lớp 10', 180000, 'Xã Long Sơn, Huyện Càng Long', 'Cần gia sư Tiếng Anh giao tiếp và ngữ pháp.', 'Ưu tiên gia sư nữ, IELTS', 'Thứ 3, 5, 7 - 19h-20h30', 'mo', 23),
('bd-003', 'admin-001', 4, 'Cần gia sư Vật Lý lớp 11 tại TP. Trà Vinh', 'Lớp 11', 200000, 'Phường 3, TP. Trà Vinh', 'Học sinh lớp 11 cần bổ sung Vật Lý, chuẩn bị thi THPT.', 'Sinh viên năm cuối hoặc kinh nghiệm', 'Thứ 2, 4 - 17h-19h', 'mo', 18),
('bd-004', 'admin-001', 2, 'Tìm gia sư Ngữ Văn lớp 6 tại Tiểu Cần', 'Lớp 6', 120000, 'TT Cầu Quan, Huyện Tiểu Cần', 'Con mới lên lớp 6, cần giúp hiểu bài và viết văn tốt.', 'Gia sư nhiệt tình, gần gũi', 'Thứ 7, CN - 14h-16h', 'mo', 12),
('bd-005', 'admin-001', 5, 'Cần gia sư Hóa Học lớp 9 tại Châu Thành', 'Lớp 9', 160000, 'Xã Hòa Tân, Huyện Châu Thành', 'Học sinh lớp 9 ôn thi vào 10, môn Hóa cần củng cố.', 'Kinh nghiệm dạy ôn thi', 'Thứ 3, 5, 7 - 18h30-20h', 'mo', 20);

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- HOÀN TẤT
-- ============================================
SELECT '============================================' AS '';
SELECT 'TUTORLINK DATABASE - KHỞI TẠO THÀNH CÔNG!' AS status;
SELECT '============================================' AS '';
SELECT CONCAT('✅ ', COUNT(*), ' gia sư') AS gia_su FROM ho_so_gia_su;
SELECT CONCAT('✅ ', COUNT(*), ' môn học') AS mon_hoc FROM mon_hoc;
SELECT CONCAT('✅ ', COUNT(*), ' bài đăng') AS bai_dang FROM bai_dang;
SELECT '============================================' AS '';
SELECT '📧 Email: 1101210001@st.tvu.edu.vn -> 1101210020@st.tvu.edu.vn' AS tai_khoan;
SELECT '🔑 Password: 123456' AS mat_khau;
SELECT '============================================' AS '';
