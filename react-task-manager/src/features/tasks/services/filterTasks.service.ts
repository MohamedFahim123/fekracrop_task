import type { PriorityFilter, Task } from "../tasksTypes";

export const filterTasksService = (
  tasks: Task[],
  priorityFilter: PriorityFilter,
): Task[] => {
  if (priorityFilter === "All") {
    return tasks;
  }

  return tasks.filter((task) => task.priority === priorityFilter);
};
