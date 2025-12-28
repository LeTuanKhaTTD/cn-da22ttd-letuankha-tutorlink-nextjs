import express from 'express';
import {
  getDashboardStats,
  getPendingTutors,
  verifyTutor,
  rejectTutor,
  getAllUsers,
  updateUserStatus,
  getAllPosts,
  updatePostStatus,
  getTutorDetail,
  getUserDetailById
} from '../controllers/adminController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Tất cả routes cần authentication và phải là admin
router.use(authenticate);
router.use(isAdmin);

/**
 * @route   GET /api/admin/stats
 * @desc    Lấy thống kê tổng quan cho dashboard admin
 * @access  Admin only
 */
router.get('/stats', getDashboardStats);

/**
 * @route   GET /api/admin/pending-tutors
 * @desc    Lấy danh sách gia sư chờ xác thực MSSV
 * @access  Admin only
 */
router.get('/pending-tutors', getPendingTutors);

/**
 * @route   POST /api/admin/verify-tutor/:tutorId
 * @desc    Xác thực MSSV sinh viên (approve)
 * @access  Admin only
 */
router.post('/verify-tutor/:tutorId', verifyTutor);

/**
 * @route   POST /api/admin/reject-tutor/:tutorId
 * @desc    Từ chối xác thực MSSV (reject)
 * @access  Admin only
 */
router.post('/reject-tutor/:tutorId', rejectTutor);

/**
 * @route   GET /api/admin/users
 * @desc    Lấy danh sách tất cả người dùng
 * @access  Admin only
 */
router.get('/users', getAllUsers);

/**
 * @route   PATCH /api/admin/users/:userId/status
 * @desc    Cập nhật trạng thái người dùng (hoạt động/khóa)
 * @access  Admin only
 */
router.patch('/users/:userId/status', updateUserStatus);

/**
 * @route   GET /api/admin/posts
 * @desc    Lấy danh sách tất cả bài đăng
 * @access  Admin only
 */
router.get('/posts', getAllPosts);

/**
 * @route   PATCH /api/admin/posts/:postId/status
 * @desc    Cập nhật trạng thái bài đăng (mở/đóng/ẩn)
 * @access  Admin only
 */
router.patch('/posts/:postId/status', updatePostStatus);

/**
 * @route   GET /api/admin/tutors/:tutorId
 * @desc    Lấy thông tin chi tiết gia sư
 * @access  Admin only
 */
router.get('/tutors/:tutorId', getTutorDetail);

/**
 * @route   GET /api/admin/users/:id
 * @desc    Lấy thông tin chi tiết user (bất kỳ vai trò nào)
 * @access  Admin only
 */
router.get('/users/:id', getUserDetailById);

export default router;
