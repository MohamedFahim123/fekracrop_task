import { TASKS_STORAGE_KEY } from "../../../utils/constants";
import { saveToStorage } from "../../../services/localStorage.service";
import type { Task, TasksState } from "../tasksTypes";

interface TasksStoreLike {
  getState: () => {
    tasks: TasksState;
  };
  subscribe: (listener: () => void) => () => void;
}

export const listenToTasksStorageService = (
  store: TasksStoreLike,
): (() => void) => {
  let previousTasks = store.getState().tasks.items;

  return store.subscribe(() => {
    const currentTasks = store.getState().tasks.items;

    if (currentTasks !== previousTasks) {
      previousTasks = currentTasks;
      saveToStorage<Task[]>(TASKS_STORAGE_KEY, currentTasks);
    }
  });
};
