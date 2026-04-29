import { useTasks } from "../../../features/tasks/hooks/useTasks";
import { PRIORITY_FILTERS } from "../../../utils/constants";

function TaskFilters() {
  const { currentFilter, handleSetFilter } = useTasks();

  return (
    <section
      aria-label="Task filters"
      className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h2 className="text-sm font-bold text-slate-950">Filter tasks</h2>
        <p className="mt-1 text-xs text-slate-500">
          Show tasks by selected priority.
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Priority filters"
      >
        {PRIORITY_FILTERS.map((filter) => {
          const isActive = currentFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => handleSetFilter(filter)}
              aria-pressed={isActive}
              className={[
                "rounded-full px-4 py-2 text-sm font-bold transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
                isActive
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              ].join(" ")}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default TaskFilters;
