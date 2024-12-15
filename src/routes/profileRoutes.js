import express from 'express';
import { getProfile,updateProfile } from '../controllers/profileController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken);

router.put('/profile', updateProfile);

export default router;