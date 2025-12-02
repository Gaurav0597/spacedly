import User from './user.model';
import Task from './task.model';
import TaskAttachment from './taskAttachment.model';

// User <-> Task associations
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Task <-> TaskAttachment associations
Task.hasMany(TaskAttachment, { foreignKey: 'taskId', as: 'attachments' });
TaskAttachment.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });

export { User, Task, TaskAttachment };
