import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useContext, useMemo } from "react";
import { fetchTaskById, updateTaskStatus } from "../api/tasks";
import { fetchProductItems } from "../api/products";
import { fetchWorkers } from "../api/workers";
import { fetchHistoryByTaskId } from "../api/history";
import TaskContext from "../context/TaskContext";
import { ProductItemCard } from "../components/UI/ProductItemCard";

export const TaskDetail = () => {
  const { tid } = useParams();
  const [tasks, setTasks] = useContext(TaskContext);
  const navigate = useNavigate();

  // Use useMemo to avoid unnecessary recalculation of task on every render
  // Handle case when tasks is not loaded or empty
  const task = useMemo(() => {
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) return null;
    return tasks.find((t) => String(t.id) === String(tid)) || null;
  }, [tasks, tid]);

  // navigate to dashboard if no task data(because tasks can only be accessed using date instead of tid)
  // useEffect(() => {
  //   // if (!task) {
  //   //   navigate("/", { replace: true });
  //   // }
  //   fetchTaskById(tid, setTasks);
  // }, [tid, setTasks]);

  // fetch product items
  const [productItems, setProductItems] = useState({});
  useEffect(() => {
    fetchProductItems(task?.product, setProductItems);
  }, [task]);

  // fetch workers
  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    fetchWorkers(setWorkers);
  }, []);
  // fetch history
  const [history, setHistory] = useState([]);
  useEffect(() => {
    // fetchHistoryByDate(task.date, setHistory);
    fetchHistoryByTaskId(task?.id, setHistory);
  }, [task]);

  // calculate total time (sum of all duration_minutes)
  const totalTime = useMemo(() => {
    if (!history || Object.keys(history).length === 0) return "00:00:00";
    const totalMinutes = Object.values(history).reduce(
      (sum, h) => sum + (h.duration_minutes || 0),
      0,
    );
    const hours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor(totalMinutes % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((totalMinutes * 60) % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [history]);

  // to update task status
  useEffect(() => {
    if (!task || !history || Object.keys(history).length === 0) return;

    const historyArr = Object.values(history);
    const allHaveStart = historyArr.every((h) => !!h.start_time);
    const allHaveEnd = historyArr.every((h) => !!h.end_time);
    const someHaveStart = historyArr.some((h) => !!h.start_time);

    if (allHaveStart && allHaveEnd) {
      // All items completed
      if (task.status !== "completed") {
        updateTaskStatus(task, "completed");
      }
    } else if (someHaveStart) {
      // Some started, not all completed
      if (task.status !== "in_progress") {
        updateTaskStatus(task, "in_progress");
      }
    } else {
      // None started
      if (task.status !== "pending") {
        updateTaskStatus(task, "pending");
      }
    }
  }, [history, task]);

  const [selectedWorkers, setSelectedWorkers] = useState({});
  useEffect(() => {
    setSelectedWorkers(() => {
      const selected = {};
      Object.values(history).forEach((h) => {
        // use worker_ids to get worker data
        // filter(Boolean) is used to remove any undefined values in case a worker id does not match any worker in the workers array
        if (!selected[h.item_id]) selected[h.item_id] = [];
        selected[h.item_id].push(
          ...(h.worker_ids || []).map((wid) =>
            workers.find((w) => w.id === wid),
          ),
        );
      });
      console.log("history: ", history);
      console.log("selected: ", selected);
      return selected;
    });
  }, [history, workers]);

  return (
    <div className="flex h-full w-full flex-col gap-4 py-10 text-2xl text-neutral-100">
      <div className="grid w-full grid-cols-2 gap-4 rounded-md bg-neutral-700 p-5 text-neutral-300">
        <h4>
          工單：
          <span className="block font-bold text-neutral-100 md:inline-block">
            {task?.id}
          </span>
        </h4>
        <h4>
          日期：
          <span className="block font-bold text-neutral-100 md:inline-block">
            {task?.date}
          </span>
        </h4>
        <h4>
          產品名稱：
          <span className="block font-bold text-neutral-100 md:inline-block">
            {task?.product}
          </span>
        </h4>
        <h4>
          重量：
          <span className="block font-bold text-neutral-100 md:inline-block">
            {task?.weight} kg
          </span>
        </h4>
        <h4>
          時間：
          <span className="font-bold text-neutral-100 md:inline-block">
            {totalTime}
          </span>
        </h4>
        <h4></h4>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(productItems?.[task?.product] ?? []).map((item) => (
          <ProductItemCard
            task={task ?? ""}
            item={item}
            workers={workers}
            selectedWorkers={selectedWorkers[item.id]}
            setSelectedWorkers={setSelectedWorkers}
            history={history[item.id]}
            setHistory={setHistory}
          />
        ))}
      </div>
    </div>
  );
};
