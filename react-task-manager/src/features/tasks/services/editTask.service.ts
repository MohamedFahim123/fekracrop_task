import type { EditTaskPayload, Task } from "../tasksTypes";

export const editTaskService = (
  tasks: Task[],
  payload: EditTaskPayload,
): Task[] => {
  return tasks.map((task) => {
    if (task.id !== payload.id) {
      return task;
    }

    return {
      ...task,
      title: payload.title.trim(),
      priority: payload.priority,
      updatedAt: new Date().toISOString(),
    };
  });
};
