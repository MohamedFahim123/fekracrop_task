type Priority = "High" | "Medium" | "Low";

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityClasses: Record<Priority, string> = {
  High: "bg-red-50 text-red-700 ring-red-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1",
        "text-xs font-bold ring-1",
        priorityClasses[priority],
      ].join(" ")}
    >
      {priority}
    </span>
  );
}

export default PriorityBadge;
