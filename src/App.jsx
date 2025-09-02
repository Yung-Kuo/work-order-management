import { useState } from "react";
import { Outlet } from "react-router";
import TaskContext from "./context/TaskContext";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });
  return (
    <div className="flex min-h-screen w-screen flex-col items-center bg-neutral-900">
      <div className="h-full w-full lg:w-4/5">
        <TaskContext value={[tasks, setTasks, date, setDate]}>
          <Outlet />
        </TaskContext>
      </div>
    </div>
  );
}

export default App;
