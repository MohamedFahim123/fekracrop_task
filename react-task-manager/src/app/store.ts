import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import { TASKS_STORAGE_KEY } from "../utils/constants";
import { loadFromStorage } from "../services/localStorage.service";
import type { Task } from "../features/tasks/tasksTypes";
import { listenToTasksStorageService } from "../features/tasks/services";

const isValidTasks = (value: unknown): value is Task[] => {
  if (!Array.isArray(value)) return false;
  return value.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "title" in item &&
      "priority" in item &&
      "completed" in item
  );
};

const preloadedTasks = loadFromStorage<Task[]>(TASKS_STORAGE_KEY, [], isValidTasks);
const preloadedTasksState = preloadedTasks.length > 0 ? { items: preloadedTasks, priorityFilter: "All" as const } : undefined;

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: preloadedTasksState ? { tasks: preloadedTasksState } : undefined,
});

listenToTasksStorageService(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
