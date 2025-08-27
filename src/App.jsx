import { useState, useEffect } from "react";
import { fetchTasksByDate, fetchAllTasks } from "./api/tasks";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasksByDate(setTasks, "2025-08-26");
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen justify-center pt-20">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <p key={task.id ?? index} className="text-neutral-200">
              {typeof task === "string" ? task : JSON.stringify(task)}
            </p>
          ))
        ) : (
          <p className="text-neutral-400">No tasks</p>
        )}
        {/* <div className="grid h-min grid-cols-5 items-center justify-between gap-x-5 gap-y-8 text-xl text-neutral-200">
          <h3>工單編號</h3>
          <h3>生產時間</h3>
          <h3>產品名稱</h3>
          <h3>生產重量</h3>
          <h3>狀態</h3>
          
          <h4>A001</h4>
          <h4>09:00:00</h4>
          <h4>黃金泡菜</h4>
          <h4>10kg</h4>
          <h4>已完成</h4>
        </div> */}
      </div>
    </>
  );
}

export default App;
