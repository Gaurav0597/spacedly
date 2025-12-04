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

export const getTasks = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user!;
    console.log(userId);
    const tasks = await taskService.getAllUserTasks(String(userId));
    console.log(tasks);
    return ApiResponse.success(res, { tasks }, 'Tasks retrieved successfully');
  },
);

export const getTask = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user!;
    const { id: taskId } = req.params;

    const task = await taskService.getTaskById(taskId, String(userId));

    return ApiResponse.success(res, { task }, 'Task retrieved successfully');
  },
);

export const updateTask = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user!;
    const { id: taskId } = req.params;
    const updateData = req.body;

    await updateTaskSchema.validateAsync(updateData);

    const task = await taskService.updateTask(
      taskId,
      String(userId),
      updateData,
    );

    return ApiResponse.success(res, { task }, 'Task updated successfully');
  },
);

export const deleteTask = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user!;
    const { id: taskId } = req.params;

    await taskService.deleteTask(taskId, String(userId));

    return ApiResponse.success(res, {}, 'Task deleted successfully');
  },
);
