import Button from "../../common/Button";
import { useTaskForm } from "../../../features/tasks/hooks/useTaskForm";
import { PRIORITIES_ARRAY } from "../../../utils/constants";
import type { Task, TaskPriority } from "../../../features/tasks/tasksTypes";

interface TaskFormProps {
  editingTask: Task | null;
  onCancelEdit: () => void;
  onSubmitSuccess: () => void;
}

function TaskForm({
  editingTask,
  onCancelEdit,
  onSubmitSuccess,
}: TaskFormProps) {
  const {
    title,
    priority,
    error,
    handleTitleChange,
    setPriority,
    handleSubmit,
    resetForm,
    isEditing,
  } = useTaskForm({ editingTask, onSubmitSuccess });

  const handleReset = () => {
    resetForm();
    if (editingTask) {
      onCancelEdit();
    }
  };

  return (
    <section
      className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6"
      aria-labelledby="task-form-heading"
    >
      <div className="mb-5">
        <h2 id="task-form-heading" className="text-lg font-bold text-slate-950">
          {isEditing ? "Edit task" : "Create a new task"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditing
            ? "Update your task details below."
            : "Add a clear task title and choose its priority."}
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-[1fr_180px]">
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Task title
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "task-title-error" : undefined}
              placeholder="Example: Finish dashboard UI"
              className={[
                "w-full rounded-xl border bg-white px-4 py-3",
                "text-sm text-slate-950 outline-none transition",
                "placeholder:text-slate-400",
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-300 focus:border-slate-500 focus:ring-4 focus:ring-slate-100",
              ].join(" ")}
            />
            {error && (
              <p
                id="task-title-error"
                className="mt-2 text-sm text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="task-priority"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Priority
            </label>

            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className={[
                "w-full rounded-xl border border-slate-300 bg-white px-4 py-3",
                "text-sm text-slate-950 outline-none transition",
                "focus:border-slate-500 focus:ring-4 focus:ring-slate-100",
              ].join(" ")}
            >
              {PRIORITIES_ARRAY.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button type="submit">
            {isEditing ? "Save changes" : "Add task"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            {isEditing ? "Cancel" : "Reset"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;
