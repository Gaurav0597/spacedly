import express from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import taskRoutes from './task.routes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/task', taskRoutes);

export default router;
