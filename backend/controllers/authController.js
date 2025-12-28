import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import pool from '../config/database.js';

// ============================================
// ĐĂNG KÝ THEO VAI TRÒ
// ============================================

/**
 * ĐĂNG KÝ PHỤ HUYNH
 */
export const registerParent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email, mat_khau, ho_ten, so_dien_thoai, dia_chi } = req.body;

    // Kiểm tra email đã tồn tại
    const [existingUser] = await pool.query(
      'SELECT id FROM nguoi_dung WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(mat_khau, 10);
    const userId = `ph-${Date.now()}`;

    // Insert phụ huynh
    await pool.query(
      `INSERT INTO nguoi_dung (id, email, mat_khau, vai_tro, ho_ten, so_dien_thoai, email_xac_thuc, trang_thai) 
       VALUES (?, ?, ?, 'phu_huynh', ?, ?, FALSE, 'hoat_dong')`,
      [userId, email, hashedPassword, ho_ten, so_dien_thoai]
    );

    // TODO: Insert hồ sơ phụ huynh khi đã có bảng ho_so_phu_huynh
    // if (dia_chi) {
    //   await pool.query(
    //     `INSERT INTO ho_so_phu_huynh (id, nguoi_dung_id, dia_chi) VALUES (UUID(), ?, ?)`,
    //     [userId, dia_chi]
    //   );
    // }

    res.status(201).json({
      success: true,
      message: 'Đăng ký phụ huynh thành công',
      data: {
        id: userId,
        email,
        ho_ten,
        vai_tro: 'phu_huynh'
      }
    });
  } catch (error) {
    console.error('Lỗi đăng ký phụ huynh:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi đăng ký',
      error: error.message
    });
  }
};

/**
 * ĐĂNG KÝ GIA SƯ (SINH VIÊN TVU)
 */
export const registerTutor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { 
      email, mat_khau, ho_ten, so_dien_thoai,
      ma_sinh_vien, ma_lop, khoa, nganh_hoc, nam_hoc,
      tieu_de, gioi_thieu, hoc_phi_gio, hinh_thuc, kinh_nghiem
    } = req.body;

    // Validate email phải có định dạng @st.tvu.edu.vn
    if (!email.endsWith('@st.tvu.edu.vn')) {
      return res.status(400).json({
        success: false,
        message: 'Email phải có định dạng @st.tvu.edu.vn của sinh viên TVU'
      });
    }

    // Validate MSSV (10 chữ số, bắt đầu bằng 11)
    if (!/^11\d{8}$/.test(ma_sinh_vien)) {
      return res.status(400).json({
        success: false,
        message: 'Mã sinh viên phải có 10 chữ số và bắt đầu bằng 11 (theo chuẩn TVU)'
      });
    }

    // Kiểm tra email đã tồn tại
    const [existingUser] = await pool.query(
      'SELECT id FROM nguoi_dung WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Kiểm tra MSSV đã tồn tại
    const [existingStudent] = await pool.query(
      'SELECT id FROM ho_so_sinh_vien WHERE ma_sinh_vien = ?',
      [ma_sinh_vien]
    );

    if (existingStudent.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Mã sinh viên đã được đăng ký'
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(mat_khau, 10);
    const userId = `gs-${Date.now()}`;

    // Bắt đầu transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 1. Insert nguoi_dung
      await connection.query(
        `INSERT INTO nguoi_dung (id, email, mat_khau, vai_tro, ho_ten, so_dien_thoai, email_xac_thuc, trang_thai) 
         VALUES (?, ?, ?, 'gia_su', ?, ?, FALSE, 'hoat_dong')`,
        [userId, email, hashedPassword, ho_ten, so_dien_thoai]
      );

      // 2. Insert ho_so_sinh_vien
      const studentId = `sv-${Date.now()}`;
      await connection.query(
        `INSERT INTO ho_so_sinh_vien (id, nguoi_dung_id, ma_sinh_vien, ma_lop, khoa, nganh_hoc, nam_hoc, da_xac_thuc) 
         VALUES (?, ?, ?, ?, ?, ?, ?, FALSE)`,
        [studentId, userId, ma_sinh_vien, ma_lop || null, khoa, nganh_hoc, nam_hoc || null]
      );

      // 3. Insert ho_so_gia_su
      await connection.query(
        `INSERT INTO ho_so_gia_su (id, nguoi_dung_id, ho_so_sinh_vien_id, tieu_de, gioi_thieu, hoc_phi_gio, hinh_thuc, kinh_nghiem, trang_thai) 
         VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, 'cho_duyet')`,
        [userId, studentId, tieu_de || `Gia sư ${nganh_hoc}`, gioi_thieu || '', hoc_phi_gio || 150000, hinh_thuc || 'ket_hop', kinh_nghiem || '']
      );

      await connection.commit();
      connection.release();

      res.status(201).json({
        success: true,
        message: 'Đăng ký gia sư thành công. Vui lòng chờ admin xác thực hồ sơ sinh viên.',
        data: {
          id: userId,
          email,
          ho_ten,
          ma_sinh_vien,
          vai_tro: 'gia_su',
          trang_thai: 'cho_duyet'
        }
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Lỗi đăng ký gia sư:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi đăng ký',
      error: error.message
    });
  }
};

/**
 * ĐĂNG KÝ ADMIN (CHỈ ADMIN HIỆN TẠI MỚI TẠO ĐƯỢC)
 */
export const registerAdmin = async (req, res) => {
  try {
    // Kiểm tra user hiện tại phải là admin
    if (req.user.vai_tro !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Chỉ admin mới có quyền tạo tài khoản admin mới'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email, mat_khau, ho_ten, so_dien_thoai } = req.body;

    // Kiểm tra email đã tồn tại
    const [existingUser] = await pool.query(
      'SELECT id FROM nguoi_dung WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(mat_khau, 10);
    const userId = `ad-${Date.now()}`;

    // Insert admin
    await pool.query(
      `INSERT INTO nguoi_dung (id, email, mat_khau, vai_tro, ho_ten, so_dien_thoai, email_xac_thuc, trang_thai) 
       VALUES (?, ?, ?, 'admin', ?, ?, TRUE, 'hoat_dong')`,
      [userId, email, hashedPassword, ho_ten, so_dien_thoai]
    );

    res.status(201).json({
      success: true,
      message: 'Tạo tài khoản admin thành công',
      data: {
        id: userId,
        email,
        ho_ten,
        vai_tro: 'admin'
      }
    });
  } catch (error) {
    console.error('Lỗi tạo admin:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi tạo admin',
      error: error.message
    });
  }
};

// ============================================
// ĐĂNG NHẬP (CHỮ MỌI VAI TRÒ)
// ============================================

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email, mat_khau } = req.body;

    // Tìm user theo email
    const [users] = await pool.query(
      `SELECT id, email, mat_khau, vai_tro, ho_ten, so_dien_thoai, avatar_url, email_xac_thuc, trang_thai 
       FROM nguoi_dung 
       WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    const user = users[0];

    // Kiểm tra tài khoản có bị khóa không
    if (user.trang_thai !== 'hoat_dong') {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản đã bị khóa hoặc tạm ngưng'
      });
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Lấy thông tin bổ sung theo vai trò
    let additionalData = {};

    if (user.vai_tro === 'gia_su') {
      const [tutorInfo] = await pool.query(
        `SELECT 
          hsv.ma_sinh_vien, hsv.khoa, hsv.nganh_hoc, hsv.da_xac_thuc,
          hsg.tieu_de, hsg.hoc_phi_gio, hsg.danh_gia_trung_binh, hsg.trang_thai as trang_thai_gia_su
         FROM ho_so_sinh_vien hsv
         LEFT JOIN ho_so_gia_su hsg ON hsv.nguoi_dung_id = hsg.nguoi_dung_id
         WHERE hsv.nguoi_dung_id = ?`,
        [user.id]
      );
      
      if (tutorInfo.length > 0) {
        additionalData = tutorInfo[0];
      }
    }

    // Tạo JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        vai_tro: user.vai_tro 
      },
      process.env.JWT_SECRET || 'tutorlink_secret_key_2025',
      { expiresIn: '7d' }
    );

    // Set cookie (httpOnly để bảo mật)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
    });

    // Xóa mật khẩu khỏi response
    delete user.mat_khau;

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: {
          ...user,
          ...additionalData
        },
        token
      }
    });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi đăng nhập',
      error: error.message
    });
  }
};

// ============================================
// ĐĂNG XUẤT
// ============================================

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Đăng xuất thành công'
  });
};

// ============================================
// LẤY THÔNG TIN USER HIỆN TẠI
// ============================================

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await pool.query(
      `SELECT id, email, vai_tro, ho_ten, so_dien_thoai, avatar_url, email_xac_thuc, trang_thai, tao_luc
       FROM nguoi_dung 
       WHERE id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }

    const user = users[0];

    // Lấy thông tin bổ sung theo vai trò
    if (user.vai_tro === 'gia_su') {
      const [tutorInfo] = await pool.query(
        `SELECT 
          hsv.ma_sinh_vien, hsv.ma_lop, hsv.khoa, hsv.nganh_hoc, hsv.nam_hoc, hsv.da_xac_thuc,
          hsg.id as gia_su_id, hsg.tieu_de, hsg.gioi_thieu, hsg.hoc_phi_gio, 
          hsg.hinh_thuc, hsg.kinh_nghiem, hsg.danh_gia_trung_binh, hsg.so_danh_gia, hsg.trang_thai as trang_thai_gia_su
         FROM ho_so_sinh_vien hsv
         LEFT JOIN ho_so_gia_su hsg ON hsv.nguoi_dung_id = hsg.nguoi_dung_id
         WHERE hsv.nguoi_dung_id = ?`,
        [userId]
      );
      
      if (tutorInfo.length > 0) {
        user.ho_so = tutorInfo[0];
      }
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Lỗi lấy thông tin user:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};
