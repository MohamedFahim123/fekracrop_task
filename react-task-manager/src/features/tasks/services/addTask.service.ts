import { nanoid } from "@reduxjs/toolkit";
import type { CreateTaskPayload, Task } from "../tasksTypes";

export const addTaskService = (
  tasks: Task[],
  payload: CreateTaskPayload,
): Task[] => {
  const now = new Date().toISOString();

  const newTask: Task = {
    id: nanoid(),
    title: payload.title.trim(),
    priority: payload.priority,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };

  return [newTask, ...tasks];
};
