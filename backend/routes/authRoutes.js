import express from 'express';
import { body } from 'express-validator';
import {
  registerParent,
  registerTutor,
  registerAdmin,
  login,
  logout,
  getCurrentUser
} from '../controllers/authController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// ============================================
// ĐĂNG KÝ THEO VAI TRÒ
// ============================================

/**
 * @route   POST /api/auth/register/parent
 * @desc    Đăng ký tài khoản phụ huynh
 * @access  Public
 */
router.post('/register/parent', [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('mat_khau').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('ho_ten').notEmpty().withMessage('Họ tên không được để trống'),
  body('so_dien_thoai').matches(/^0\d{9}$/).withMessage('Số điện thoại phải có 10 chữ số và bắt đầu bằng 0')
], registerParent);

/**
 * @route   POST /api/auth/register/tutor
 * @desc    Đăng ký tài khoản gia sư (sinh viên TVU)
 * @access  Public
 */
router.post('/register/tutor', [
  body('email').isEmail().withMessage('Email không hợp lệ')
    .custom((value) => {
      if (!value.endsWith('@st.tvu.edu.vn')) {
        throw new Error('Email phải có định dạng @st.tvu.edu.vn');
      }
      return true;
    }),
  body('mat_khau').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('ho_ten').notEmpty().withMessage('Họ tên không được để trống'),
  body('so_dien_thoai').matches(/^0\d{9}$/).withMessage('Số điện thoại phải có 10 chữ số'),
  body('ma_sinh_vien').matches(/^11\d{8}$/).withMessage('Mã sinh viên phải có 10 chữ số và bắt đầu bằng 11'),
  body('khoa').notEmpty().withMessage('Khoa không được để trống'),
  body('nganh_hoc').notEmpty().withMessage('Ngành học không được để trống'),
  body('hoc_phi_gio').optional().isFloat({ min: 50000, max: 500000 })
    .withMessage('Học phí phải từ 50,000 - 500,000 VNĐ/giờ')
], registerTutor);

/**
 * @route   POST /api/auth/register/admin
 * @desc    Tạo tài khoản admin (chỉ admin hiện tại mới tạo được)
 * @access  Private (Admin only)
 */
router.post('/register/admin', 
  authenticate, 
  isAdmin,
  [
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('mat_khau').isLength({ min: 8 }).withMessage('Mật khẩu admin phải có ít nhất 8 ký tự'),
    body('ho_ten').notEmpty().withMessage('Họ tên không được để trống')
  ], 
  registerAdmin
);

// ============================================
// ĐĂNG NHẬP & ĐĂNG XUẤT
// ============================================

/**
 * @route   POST /api/auth/login
 * @desc    Đăng nhập (tất cả vai trò)
 * @access  Public
 */
router.post('/login', [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('mat_khau').notEmpty().withMessage('Mật khẩu không được để trống')
], login);

/**
 * @route   POST /api/auth/logout
 * @desc    Đăng xuất
 * @access  Private
 */
router.post('/logout', authenticate, logout);

/**
 * @route   GET /api/auth/me
 * @desc    Lấy thông tin user hiện tại
 * @access  Private
 */
router.get('/me', authenticate, getCurrentUser);

export default router;
