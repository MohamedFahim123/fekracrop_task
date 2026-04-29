import type { Task } from "../tasksTypes";

export const toggleCompleteTaskService = (
  tasks: Task[],
  taskId: Task["id"],
): Task[] => {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      completed: !task.completed,
      updatedAt: new Date().toISOString(),
    };
  });
};
