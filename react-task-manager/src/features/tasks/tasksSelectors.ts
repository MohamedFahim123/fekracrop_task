import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { TasksState } from "./tasksTypes";

export const selectTasksState = (state: RootState): TasksState => state.tasks;

export const selectTasks = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.items
);

export const selectPriorityFilter = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.priorityFilter
);

export const selectFilteredTasks = createSelector(
  [selectTasks, selectPriorityFilter],
  (tasks, filter) => {
    if (filter === "All") return tasks;
    return tasks.filter((task) => task.priority === filter);
  }
);

export const selectTaskStats = createSelector(
  [selectTasks],
  (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }
);
