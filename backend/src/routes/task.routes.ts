import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as taskcontroller from '../controllers/task.controller';

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(taskcontroller.createTask).get(taskcontroller.getTasks);

export default router;
