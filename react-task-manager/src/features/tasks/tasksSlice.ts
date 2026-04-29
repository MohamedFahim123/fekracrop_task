import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CreateTaskPayload,
  EditTaskPayload,
  PriorityFilter,
  Task,
  TasksState,
} from "./tasksTypes";
import {
  addTaskService,
  clearTasksService,
  deleteTaskService,
  editTaskService,
  toggleCompleteTaskService,
} from "./services";

const initialState: TasksState = {
  items: [],
  priorityFilter: "All",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<CreateTaskPayload>) => {
      state.items = addTaskService(state.items, action.payload);
    },

    editTask: (state, action: PayloadAction<EditTaskPayload>) => {
      state.items = editTaskService(state.items, action.payload);
    },

    deleteTask: (state, action: PayloadAction<Task["id"]>) => {
      state.items = deleteTaskService(state.items, action.payload);
    },

    toggleTaskCompletion: (state, action: PayloadAction<Task["id"]>) => {
      state.items = toggleCompleteTaskService(state.items, action.payload);
    },

    clearTasks: (state) => {
      state.items = clearTasksService();
    },

    setPriorityFilter: (state, action: PayloadAction<PriorityFilter>) => {
      state.priorityFilter = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
  clearTasks,
  setPriorityFilter,
} = tasksSlice.actions;

export default tasksSlice.reducer;
