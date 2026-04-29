import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addTask, editTask } from "../tasksSlice";
import { selectTasks } from "../tasksSelectors";
import { isDuplicateTaskTitleService } from "../services";
import type { Task, TaskPriority } from "../tasksTypes";

interface UseTaskFormProps {
  editingTask: Task | null;
  onSubmitSuccess: () => void;
}

export const useTaskForm = ({ editingTask, onSubmitSuccess }: UseTaskFormProps) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  const [title, setTitle] = useState(editingTask?.title || "");
  const [priority, setPriority] = useState<TaskPriority>(
    editingTask?.priority || "Medium"
  );
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (error) setError(null);
  };

  const resetForm = () => {
    setTitle("");
    setPriority("Medium");
    setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    
    if (!trimmedTitle) {
      const errorMsg = "Task title is required.";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const isDuplicate = isDuplicateTaskTitleService(
      tasks,
      trimmedTitle,
      editingTask?.id
    );

    if (isDuplicate) {
      const errorMsg = editingTask
        ? "Another task with this title already exists."
        : "A task with this title already exists.";
      toast.error(errorMsg);
      return;
    }

    if (editingTask) {
      dispatch(
        editTask({
          id: editingTask.id,
          title: trimmedTitle,
          priority,
        })
      );
      toast.success("Task updated successfully.");
    } else {
      dispatch(
        addTask({
          title: trimmedTitle,
          priority,
        })
      );
      toast.success("Task added successfully.");
    }

    resetForm();
    onSubmitSuccess();
  };

  return {
    title,
    priority,
    error,
    handleTitleChange,
    setPriority,
    handleSubmit,
    resetForm,
    isEditing: !!editingTask,
  };
};
