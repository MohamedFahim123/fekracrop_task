import { Toaster } from "react-hot-toast";
import TasksPage from "./components/tasks/TasksPage";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />
      <TasksPage />
    </>
  );
}

export default App;
