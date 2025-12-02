import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import * as reminderController from '../controllers/reminder.controller';
const router = express.Router()

router.use(authMiddleware)

router
  .route('/')
  .post(reminderController.createReminder)
  .get(reminderController.getReminders);

router
  .route('/:id')
  .put(reminderController.updateReminder)
  .delete(reminderController.deleteReminder);

export default router