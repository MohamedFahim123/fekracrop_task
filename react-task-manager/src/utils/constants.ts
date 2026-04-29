import type { PriorityFilter, TaskPriority } from "../features/tasks/tasksTypes";

export const PRIORITIES_ARRAY: TaskPriority[] = ["High", "Medium", "Low"];

export const PRIORITY_FILTERS: PriorityFilter[] = [
  "All",
  "High",
  "Medium",
  "Low",
];

export const DEFAULT_PRIORITY: TaskPriority = "Medium";
export const TASKS_STORAGE_KEY = "react_task_manager";