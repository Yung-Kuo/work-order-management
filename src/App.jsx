import { useState } from "react";
import { Outlet } from "react-router";
import TaskContext from "./context/TaskContext";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <div className="flex min-h-screen w-screen flex-col items-center bg-neutral-900">
      <div className="h-full w-4/5">
        <TaskContext value={[tasks, setTasks]}>
          <Outlet />
        </TaskContext>
      </div>
    </div>
  );
}

export default App;
