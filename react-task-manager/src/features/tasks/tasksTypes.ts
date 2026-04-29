export type TaskPriority = "High" | "Medium" | "Low";

export type PriorityFilter = "All" | TaskPriority;

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TasksState {
  items: Task[];
  priorityFilter: PriorityFilter;
}

export interface CreateTaskPayload {
  title: string;
  priority: TaskPriority;
}

export interface EditTaskPayload {
  id: string;
  title: string;
  priority: TaskPriority;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}
