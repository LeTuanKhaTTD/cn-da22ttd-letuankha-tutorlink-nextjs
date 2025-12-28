import express from 'express';
import { chatWithAI, getQuickSuggestions } from '../controllers/chatController.js';

const router = express.Router();

/**
 * @route   POST /api/chat
 * @desc    Chat với AI assistant
 * @access  Public (có thể thêm auth nếu cần)
 */
router.post('/', chatWithAI);

/**
 * @route   GET /api/chat/suggestions
 * @desc    Lấy danh sách gợi ý chat nhanh
 * @access  Public
 */
router.get('/suggestions', getQuickSuggestions);

export default router;
