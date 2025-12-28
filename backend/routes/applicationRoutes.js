import express from 'express';
import {
  getAllApplications,
  getMyApplications,
  getApplicationsByPost,
  createApplication,
  updateApplicationStatus
} from '../controllers/applicationController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getAllApplications); // Admin only (can add admin check middleware)
router.get('/my', getMyApplications); // Tutor gets their applications
router.get('/post/:postId', getApplicationsByPost); // Parent gets applications for their post
router.post('/', createApplication); // Tutor applies to a post
router.put('/:id', updateApplicationStatus); // Parent accepts/rejects application

export default router;
