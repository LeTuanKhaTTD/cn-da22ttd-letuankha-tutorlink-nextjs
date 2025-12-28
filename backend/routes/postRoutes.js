import express from 'express';
import {
  getAllPosts,
  getPostById,
  getMyPosts,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected routes (require authentication)
router.get('/my/posts', authenticate, getMyPosts);
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

export default router;
