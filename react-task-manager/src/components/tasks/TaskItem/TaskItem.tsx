import Button from "../../common/Button";
import PriorityBadge from "../../common/PriorityBadge";
import { useTasks } from "../../../features/tasks/hooks/useTasks";
import type { Task } from "../../../features/tasks/tasksTypes";

interface TaskItemProps {
  task: Task;
  onEditTask: () => void;
}

function TaskItem({ task, onEditTask }: TaskItemProps) {
  const { handleToggleTask, handleDeleteTask } = useTasks();
  const { id, title, priority, completed, createdAt } = task;

  return (
    <li
      className={[
        "rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition",
        "hover:shadow-md",
        completed ? "opacity-75" : "",
      ].join(" ")}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => handleToggleTask(id, completed)}
              aria-label={`Mark ${title} as complete`}
              className="mt-1 h-4 w-4 rounded border-slate-300 accent-slate-950 focus:ring-slate-500"
            />

            <span
              className={[
                "wrap-break-words text-base font-bold",
                completed ? "text-slate-400 line-through" : "text-slate-950",
              ].join(" ")}
            >
              {title}
            </span>
          </label>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <PriorityBadge priority={priority} />

            <span className="text-xs font-medium text-slate-400">
              Created {new Date(createdAt).toLocaleDateString()}
            </span>

            {completed && (
              <span className="text-xs font-bold text-emerald-600">
                Completed
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 sm:shrink-0">
          <Button variant="secondary" size="sm" onClick={onEditTask}>
            Edit
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDeleteTask(id)}
            aria-label={`Delete task ${title}`}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
