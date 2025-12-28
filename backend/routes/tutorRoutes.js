import express from 'express';
import {
  getAllTutors,
  getTutorById,
  getMajors,
  getTutorStats,
  updateTutorProfile
} from '../controllers/tutorController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/tutors
 * @desc    Lấy danh sách gia sư (có filter và phân trang)
 * @query   nganh, minPrice, maxPrice, rating, page, limit
 * @access  Public
 */
router.get('/', getAllTutors);

/**
 * @route   GET /api/tutors/stats
 * @desc    Lấy thống kê gia sư
 * @access  Public
 */
router.get('/stats', getTutorStats);

/**
 * @route   GET /api/tutors/majors
 * @desc    Lấy danh sách ngành học
 * @access  Public
 */
router.get('/majors', getMajors);

/**
 * @route   GET /api/tutors/:id
 * @desc    Lấy thông tin chi tiết 1 gia sư
 * @access  Public
 */
router.get('/:id', getTutorById);

/**
 * @route   PATCH /api/tutors/profile/:id
 * @desc    Cập nhật hồ sơ gia sư (chỉ cho chính user đó)
 * @access  Private (Gia sư)
 */
router.patch('/profile/:id', authenticate, updateTutorProfile);

export default router;
