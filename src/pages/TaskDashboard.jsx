import { useState, useEffect, useContext } from "react";
import TaskContext from "../context/TaskContext";
import { NavLink } from "react-router";
import { TaskTab } from "../components/UI/TaskTab";
import { fetchTasksByDate } from "../api/tasks";

export const TaskDashboard = () => {
  const [date, setDate] = useState("2025-08-26");
  // const [tasks, setTasks] = useState([]);
  const fillerTasks = [
    ["A001", "09:00:00", "黃金泡菜", "10 kg", "completed"],
    ["A002", "13:00:00", "海帶芽", "5 kg", "pending"],
    ["A001", "09:00:00", "黃金泡菜", "10 kg", "completed"],
    ["A002", "13:00:00", "海帶芽", "5 kg", "in_progress"],
    ["A001", "09:00:00", "黃金泡菜", "10 kg", "completed"],
    ["A002", "13:00:00", "海帶芽", "5 kg", "pending"],
    ["A001", "09:00:00", "黃金泡菜", "10 kg", "completed"],
    ["A002", "13:00:00", "海帶芽", "5 kg", "in_progress"],
  ];
  const [tasks, setTasks] = useContext(TaskContext);
  useEffect(() => {
    fetchTasksByDate(setTasks, date);
  }, [date]);
  const [selectedTask, setSelectedTask] = useState([]);

  return (
    <div className="flex h-screen w-full flex-col items-center gap-4 py-10 text-2xl text-neutral-100">
      <input
        type="date"
        id="workDate"
        name="work-date"
        value={date}
        min="2025-08-25"
        max="2025-09-05"
        className="custom-date-input mb-4 rounded-md border border-neutral-400 p-1 text-3xl ring-sky-300 transition-all outline-none focus:border-sky-300 focus:ring"
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="w-full p-1">
        <div className="grid w-full grid-cols-5 rounded-md bg-neutral-700">
          <h3 className="p-4">工單編號</h3>
          <h3 className="border-l border-dotted border-neutral-400 p-4">
            生產時間
          </h3>
          <h3 className="border-l border-dotted border-neutral-400 p-4">
            產品名稱
          </h3>
          <h3 className="border-l border-dotted border-neutral-400 p-4">
            生產重量
          </h3>
          <h3 className="border-l border-dotted border-neutral-400 p-4">
            狀態
          </h3>
        </div>
      </div>

      {/* task list */}
      <div className="relative w-full grow overflow-y-auto">
        <div className="flex w-full flex-col gap-4 p-1">
          {tasks && tasks.length > 0 ? (
            <>
              {tasks.map((task, index) => (
                <NavLink
                  key={task.id}
                  to={`/task/${task.id}`}
                  className="w-full"
                  onClick={() => setSelectedTask(task)}
                >
                  <TaskTab
                    first={task.id ?? index}
                    second={""}
                    third={task.product}
                    fourth={task.weight + " kg"}
                    fifth={task.status}
                  />
                </NavLink>
              ))}

              {fillerTasks.map((ft, index) => (
                <TaskTab
                  first={ft[0] ?? index}
                  second={ft[1]}
                  third={ft[2]}
                  fourth={ft[3]}
                  fifth={ft[4]}
                />
              ))}
            </>
          ) : (
            <p className="text-neutral-400">No tasks</p>
          )}
        </div>
        {/*  */}
        <div className="sticky bottom-0 left-0 z-10 h-10 w-full bg-gradient-to-b from-transparent to-neutral-900"></div>
      </div>
    </div>
  );
};
