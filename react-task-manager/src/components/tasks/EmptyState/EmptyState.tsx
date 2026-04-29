function EmptyState() {
  return (
    <section
      className="rounded-3xl bg-white px-6 py-14 text-center shadow-sm ring-1 ring-slate-200"
      aria-live="polite"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <span className="text-2xl" aria-hidden="true">
          ✓
        </span>
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-950">No tasks found</h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Add a task or change the selected priority filter.
      </p>
    </section>
  );
}

export default EmptyState;
