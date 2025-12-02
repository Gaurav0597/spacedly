import { Request, Response } from 'express';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validations/task.validation';
import { CustomRequest } from '../middlewares/auth.middleware';
import ApiResponse from '../utils/apiResponse';
import ApiError from '../utils/apiError';
import HTTP_STATUS from '../constants';
import asyncWrapper from '../utils/asyncWrapper';
import * as taskService from '../services/task.service';


export const createTask = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user!;
    const taskData = req.body;

    await createTaskSchema.validateAsync(taskData);

    const task = await taskService.createTask({
      userId: String(userId),
      ...taskData,
    });

    return ApiResponse.created(res, { task }, 'Task created successfully');
  },
);

// export const getTasks = asyncWrapper(
//   async (req: CustomRequest, res: Response) => {
//     const { id: userId } = req.user!;

//     const tasks = await taskService.getAllUserTasks(String(userId));

//     return ApiResponse.success(res, { tasks }, 'Tasks retrieved successfully');
//   },
// );
