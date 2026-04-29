import { useCallback } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectFilteredTasks,
  selectTaskStats,
  selectPriorityFilter,
} from "../tasksSelectors";
import {
  deleteTask,
  toggleTaskCompletion,
  clearTasks,
  setPriorityFilter,
} from "../tasksSlice";
import type { PriorityFilter } from "../tasksTypes";

export const useTasks = () => {
  const dispatch = useAppDispatch();
  
  const filteredTasks = useAppSelector(selectFilteredTasks);
  const stats = useAppSelector(selectTaskStats);
  const currentFilter = useAppSelector(selectPriorityFilter);

  const handleToggleTask = useCallback((id: string, completed: boolean) => {
    dispatch(toggleTaskCompletion(id));
    if (completed) {
      toast.success("Task marked as pending.");
    } else {
      toast.success("Task marked as completed.");
    }
  }, [dispatch]);

  const handleDeleteTask = useCallback((id: string) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully.");
  }, [dispatch]);

  const handleClearTasks = useCallback(() => {
    if (stats.total === 0) {
      toast.error("There are no tasks to clear.");
      return;
    }

    if (window.confirm("Are you sure you want to clear all tasks?")) {
      dispatch(clearTasks());
      toast.success("All tasks cleared.");
      return true; // Indicate success for UI cleanup (like clearing editingTask)
    }
    return false;
  }, [dispatch, stats.total]);

  const handleSetFilter = useCallback((filter: PriorityFilter) => {
    dispatch(setPriorityFilter(filter));
  }, [dispatch]);

  return {
    filteredTasks,
    stats,
    currentFilter,
    handleToggleTask,
    handleDeleteTask,
    handleClearTasks,
    handleSetFilter,
  };
};
