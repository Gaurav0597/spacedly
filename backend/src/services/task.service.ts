import ApiError from '../utils/apiError';
import HTTP_STATUS from '../constants';
import fs from 'fs';
import path from 'path';
import Task from '../models/task.model';

interface CreateTaskInput {
  userId: string;
  title: string;
  description?: string;
  category: 'Study' | 'Work' | 'Personal';
  priority: 'Low' | 'Medium' | 'High';
  link?: string;
}

export const createTask = async (taskData: CreateTaskInput) => {
  const task = await Task.create(taskData as any);
  return task;
};

// export const getAllUserTasks = async (userId: string) => {
//   const tasks = await Task.findAll({
//     where: { userId },
//     include: [
//       {
//         model: TaskAttachment,
//         as: 'attachments',
//         attributes: [
//           'id',
//           'fileName',
//           'originalName',
//           'fileSize',
//           'fileType',
//           'fileUrl',
//         ],
//       },
//     ],
//     order: [['createdAt', 'DESC']],
//   });

//   return tasks;
// };
