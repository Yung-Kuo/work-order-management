import { useState, useEffect, useContext } from "react";
import TaskContext from "../context/TaskContext";
import { NavLink } from "react-router";
import { fetchTasksByDate } from "../api/tasks";
import { TaskTab } from "../components/UI/TaskTab";
import { NewTaskPopup } from "../components/UI/NewTaskPopup";

export const TaskDashboard = () => {
  // const [date, setDate] = useState("2025-08-26");
  // const [tasks, setTasks] = useState([]);
  const fillerTasks = [
    {
      id: "A001",
      totalTime: "09:00:00",
      product: "黃金泡菜",
      weight: "10 kg",
      status: "completed",
    },
    {
      id: "A002",
      totalTime: "13:00:00",
      product: "海帶芽",
      weight: "5 kg",
      status: "pending",
    },
    {
      id: "A001",
      totalTime: "09:00:00",
      product: "黃金泡菜",
      weight: "10 kg",
      status: "completed",
    },
    {
      id: "A002",
      totalTime: "13:00:00",
      product: "海帶芽",
      weight: "5 kg",
      status: "in_progress",
    },
    {
      id: "A001",
      totalTime: "09:00:00",
      product: "黃金泡菜",
      weight: "10 kg",
      status: "completed",
    },
    {
      id: "A002",
      totalTime: "13:00:00",
      product: "海帶芽",
      weight: "5 kg",
      status: "pending",
    },
    {
      id: "A001",
      totalTime: "09:00:00",
      product: "黃金泡菜",
      weight: "10 kg",
      status: "completed",
    },
    {
      id: "A002",
      totalTime: "13:00:00",
      product: "海帶芽",
      weight: "5 kg",
      status: "in_progress",
    },
  ];
  const [tasks, setTasks, date, setDate] = useContext(TaskContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchTasksByDate((tasks) => {
      setTasks(tasks);
      setLoading(false);
    }, date);
  }, [date]);

  const [openNewTask, setOpenNewTask] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col items-center gap-5 py-6 text-xl text-neutral-100 md:py-10 md:text-2xl">
      {openNewTask && <NewTaskPopup toggle={setOpenNewTask} />}
      {/* date & add new task */}
      <div className="flex h-12 w-full items-center px-4 md:h-14">
        {/* date window & switch date */}
        <div className="relative left-1/2 flex h-full w-full -translate-x-1/2 items-center justify-between md:w-min md:gap-4">
          {/* previous day */}
          <button
            className="h-10 w-10 cursor-pointer rounded-md bg-neutral-600 transition-all hover:bg-neutral-500 active:scale-95 md:h-12 md:w-12"
            onClick={() => {
              // setDate to previous day
              const prevDate = new Date(date);
              prevDate.setDate(prevDate.getDate() - 1);
              const yyyy = prevDate.getFullYear();
              // getMonth() is zero-based, so add 1 to get the correct month number
              const mm = String(prevDate.getMonth() + 1).padStart(2, "0");
              const dd = String(prevDate.getDate()).padStart(2, "0");
              setDate(`${yyyy}-${mm}-${dd}`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* date window */}
          <div className="h-full w-min">
            <input
              type="date"
              id="workDate"
              name="work-date"
              value={date}
              min="2025-08-25"
              max="2025-09-05"
              className="h-full rounded-md border border-neutral-400 px-1 text-2xl ring-sky-300 transition-all outline-none focus:border-sky-300 focus:ring md:text-3xl"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* next day */}
          <button
            className="h-10 w-10 cursor-pointer rounded-md bg-neutral-600 transition-all hover:bg-neutral-500 active:scale-95 md:h-12 md:w-12"
            onClick={() => {
              // setDate to previous day
              const prevDate = new Date(date);
              prevDate.setDate(prevDate.getDate() + 1);
              const yyyy = prevDate.getFullYear();
              // getMonth() is zero-based, so add 1 to get the correct month number
              const mm = String(prevDate.getMonth() + 1).padStart(2, "0");
              const dd = String(prevDate.getDate()).padStart(2, "0");
              setDate(`${yyyy}-${mm}-${dd}`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* add new task button for medium screen and above */}
        <button
          className="hidden h-12 w-12 cursor-pointer items-center justify-center bg-neutral-300 font-bold text-neutral-800 transition-all hover:bg-neutral-100 active:scale-95 md:ml-auto md:flex md:h-full md:w-max md:rounded-md md:px-4"
          onClick={() => setOpenNewTask((prev) => !prev)}
        >
          <span>新增工單</span>
        </button>
        {/* add new task button for small screen */}
        <button
          className="fixed right-5 bottom-5 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-neutral-300 font-bold text-neutral-800 transition-all hover:bg-neutral-100 active:scale-95 md:hidden"
          onClick={() => setOpenNewTask((prev) => !prev)}
        >
          <span className="flex overflow-hidden text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* table header */}
      <div className="h-min w-full px-4">
        <div className="grid w-full grid-cols-5 rounded-md bg-neutral-700">
          <h3 className="p-2 text-center lg:p-4">工單編號</h3>
          <h3 className="border-l border-dotted border-neutral-400 p-2 text-center lg:p-4">
            生產時間
          </h3>
          <h3 className="border-l border-dotted border-neutral-400 p-2 text-center lg:p-4">
            產品名稱
          </h3>
          <h3 className="border-l border-dotted border-neutral-400 p-2 text-center lg:p-4">
            生產重量
          </h3>
          <h3 className="border-l border-dotted border-neutral-400 p-2 text-center lg:p-4">
            狀態
          </h3>
        </div>
      </div>

      {/* task list */}
      <div className="w-full grow overflow-y-auto px-4">
        <div className="flex w-full flex-col gap-4">
          {loading ? (
            <p className="text-neutral-400">loading</p>
          ) : tasks && tasks.length > 0 ? (
            <>
              {tasks.map((task, index) => (
                <NavLink
                  key={task.id}
                  to={`/task/${task.id}`}
                  className="w-full"
                >
                  <TaskTab task={task} />
                </NavLink>
              ))}
              {/* Render fillerTasks after the real tasks */}
              {/* {fillerTasks &&
                fillerTasks.map((ft, index) => (
                  <TaskTab key={`filler-${index}`} task={ft} />
                ))} */}
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
