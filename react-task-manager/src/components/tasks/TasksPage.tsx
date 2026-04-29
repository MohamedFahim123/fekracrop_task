import { useState, useCallback, useEffect } from "react";
import { useTasks } from "../../features/tasks/hooks/useTasks";
import type { Task } from "../../features/tasks/tasksTypes";
import EmptyState from "./EmptyState/EmptyState";
import TaskFilters from "./TaskFilters/TaskFilters";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";
import Button from "../common/Button";

export default function TasksPage() {
  const { 
    filteredTasks, 
    stats, 
    handleClearTasks 
  } = useTasks();
  
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const pendingTasks = stats.pending;
    document.title = pendingTasks > 0 ? `Task Manager (${pendingTasks} pending)` : "Task Manager";
  }, [stats.pending]);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  const handleSubmitSuccess = useCallback(() => {
    setEditingTask(null);
  }, []);

  const onClear = useCallback(() => {
    const success = handleClearTasks();
    if (success) {
      setEditingTask(null);
    }
  }, [handleClearTasks]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Task Manager
            </h1>
            {stats.total > 0 && (
              <div>
                <Button variant="danger" size="sm" onClick={onClear}>
                  Clear all tasks
                </Button>
              </div>
            )}
          </div>

          <section
            aria-label="Task statistics"
            className="grid grid-cols-3 gap-2 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:min-w-80"
          >
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-2xl font-black text-slate-950">{stats.total}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                Total
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4 text-center">
              <p className="text-2xl font-black text-emerald-700">{stats.completed}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                Done
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4 text-center">
              <p className="text-2xl font-black text-amber-700">{stats.pending}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-amber-700">
                Pending
              </p>
            </div>
          </section>
        </header>

        <div className="space-y-5">
          <TaskForm
            key={editingTask ? editingTask.id : "new-task"}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
            onSubmitSuccess={handleSubmitSuccess}
          />

          <TaskFilters />

          {filteredTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <TaskList tasks={filteredTasks} onEditTask={handleEditTask} />
          )}
        </div>
      </section>
    </main>
  );
}
