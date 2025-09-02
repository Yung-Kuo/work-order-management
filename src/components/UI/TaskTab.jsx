import { useState, useEffect, useMemo } from "react";
import { fetchHistoryByTaskId } from "../../api/history";
export const TaskTab = ({ task }) => {
  // fetch history
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetchHistoryByTaskId(task.id, setHistory);
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
    const seconds = "00";
    return `${hours}:${minutes}:${seconds}`;
  }, [history]);

  if (!task?.id) return null;
  return (
    <div
      key={task?.id}
      className="grid w-full cursor-pointer grid-cols-5 rounded-md border border-neutral-400 break-all transition-all hover:border-neutral-300 hover:ring-2 hover:ring-neutral-300 active:scale-95"
    >
      <h4 className="p-2 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700 lg:p-4">
        {task?.id}
      </h4>
      <h4 className="p-2 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700 lg:p-4">
        {task?.totalTime || totalTime}
      </h4>
      <h4 className="p-2 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700 lg:p-4">
        {task.product}
      </h4>
      <h4 className="p-2 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700 lg:p-4">
        {task.weight + " kg"}
      </h4>
      <h4 className="p-2 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700 lg:p-4">
        {task.status}
      </h4>
    </div>
  );
};
