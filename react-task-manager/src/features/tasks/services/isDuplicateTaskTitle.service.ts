import type { Task } from "../tasksTypes";

export const isDuplicateTaskTitleService = (
  tasks: Task[],
  title: string,
  ignoredTaskId?: string
): boolean => {
  const normalizedTitle = title.trim().toLowerCase();
  
  if (!normalizedTitle) return false;

  return tasks.some((task) => {
    if (ignoredTaskId && task.id === ignoredTaskId) {
      return false;
    }
    return task.title.trim().toLowerCase() === normalizedTitle;
  });
};
