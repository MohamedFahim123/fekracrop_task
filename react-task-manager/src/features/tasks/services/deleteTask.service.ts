import type { Task } from "../tasksTypes";

export const deleteTaskService = (
  tasks: Task[],
  taskId: Task["id"],
): Task[] => {
  return tasks.filter((task) => task.id !== taskId);
};
