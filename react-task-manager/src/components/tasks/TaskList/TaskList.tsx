import TaskItem from "../TaskItem/TaskItem";
import type { Task } from "../../../features/tasks/tasksTypes";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

function TaskList({ tasks, onEditTask }: TaskListProps) {
  return (
    <section aria-labelledby="task-list-heading">
      <h2 id="task-list-heading" className="sr-only">
        Task list
      </h2>

      <ul className="space-y-3" aria-label="Tasks">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEditTask={() => onEditTask(task)}
          />
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
