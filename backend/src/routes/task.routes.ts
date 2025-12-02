import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createTask } from '../controllers/task.controller';

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(createTask);

export default router;
