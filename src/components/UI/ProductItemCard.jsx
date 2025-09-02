import { useState, useEffect, useContext } from "react";
import TaskContext from "../../context/TaskContext";
import { upsertHistory } from "../../api/history";
import { ComboboxCreate } from "../HeadlessUI/ComboboxCreate";

// Helper to format duration in HH:mm:ss
function formatDuration(ms) {
  if (!ms || ms < 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export const ProductItemCard = ({
  task,
  item,
  workers,
  selectedWorkers,
  setSelectedWorkers,
  history,
  setHistory,
}) => {
  const [setTasks] = useContext(TaskContext);
  const [tempWorker, setTempWorker] = useState([]);
  const [timer, setTimer] = useState(0);

  // Timer effect: updates every second if counting
  useEffect(() => {
    let intervalId = null;

    if (history?.start_time) {
      const start = new Date(history.start_time).getTime();
      const end = history?.end_time
        ? new Date(history.end_time).getTime()
        : null;

      if (!end) {
        // Counting: update every second
        setTimer(Date.now() - start);
        intervalId = setInterval(() => {
          setTimer(Date.now() - start);
        }, 1000);
      } else {
        // Finished: show the difference
        setTimer(end - start);
      }
    } else {
      setTimer(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [history?.start_time, history?.end_time]);

  const handleAddWorker = async () => {
    const currentList = selectedWorkers ?? [];
    const newList = [...currentList, tempWorker];

    // Create the history template with the new, correct data
    const newHistoryTemplate = {
      task_id: task.id,
      product_id: 0,
      item_id: item.id,
      worker_ids: newList.map((w) => w.id),
      weight: 0,
      start_time: history?.start_time || "",
      end_time: history?.end_time || "",
    };

    try {
      const response = await upsertHistory(newHistoryTemplate);
      console.log("response: ", response);
      if (response) {
        setHistory((prevHistory) => ({
          ...prevHistory,
          [item.id]: {
            ...prevHistory[item.id],
            ...newHistoryTemplate,
          },
        }));
      }
    } catch (err) {
      console.error("Failed to upsert history after adding worker:", err);
    }
    setTempWorker([]);
  };

  const handleDeleteWorker = async (workerId) => {
    const newList = (selectedWorkers ?? []).filter((w) => w.id !== workerId);

    // Prepare the new history template with updated worker_ids
    const newHistoryTemplate = {
      task_id: task.id,
      product_id: 0,
      item_id: item.id,
      worker_ids: newList.map((w) => w.id),
      weight: 0,
      start_time: history?.start_time || "",
      end_time: history?.end_time || "",
    };

    try {
      const response = await upsertHistory(newHistoryTemplate);
      if (response) {
        setHistory((prevHistory) => ({
          ...prevHistory,
          [item.id]: {
            ...prevHistory[item.id],
            worker_ids: response.workers,
          },
        }));
      }
    } catch (err) {
      console.error("Failed to upsert history after deleting worker:", err);
    }
  };

  const handleAddStartTime = async () => {
    // upsert start_time for this item
    const now = new Date().toISOString();
    try {
      const workerIds = (selectedWorkers ?? []).map((w) => w.id);
      const newHistoryTemplate = {
        task_id: task.id,
        product_id: 0,
        item_id: item.id,
        worker_ids: workerIds,
        weight: 0,
        start_time: now,
        end_time: history?.end_time || "",
      };
      const updatedHistory = await upsertHistory(newHistoryTemplate);
      if (updatedHistory) {
        setHistory((prev) => ({
          ...prev,
          [item.id]: { ...prev[item.id], ...newHistoryTemplate },
        }));
      }
    } catch (err) {
      console.error("Failed to upsert start_time:", err);
    }
  };

  const handleAddEndTime = async () => {
    // upsert end_time for this item
    const now = new Date().toISOString();
    try {
      const workerIds = (selectedWorkers ?? []).map((w) => w.id);
      const newHistoryTemplate = {
        task_id: task.id,
        product_id: 0,
        item_id: item.id,
        worker_ids: workerIds,
        weight: 0,
        start_time: history?.start_time || "",
        end_time: now,
      };
      const updatedHistory = await upsertHistory(newHistoryTemplate);
      console.log("newHistoryTemplate: ", newHistoryTemplate);
      if (updatedHistory) {
        setHistory((prev) => ({
          ...prev,
          [item.id]: { ...prev[item.id], ...newHistoryTemplate },
        }));
      }
    } catch (err) {
      console.error("Failed to upsert end_time:", err);
    }
  };

  return (
    <div
      key={item.id}
      className="h-min min-h-60 w-full overflow-hidden rounded-md border border-neutral-700 bg-neutral-800"
    >
      <div className="flex w-full justify-center bg-neutral-700 p-2">
        <h3>{item.name}</h3>
      </div>
      <div className="flex flex-col gap-5 p-5">
        {/* workers select field */}
        <div className="flex items-center gap-5">
          <div className="w-3/5">
            <ComboboxCreate
              name="員工"
              options={workers}
              value={tempWorker}
              onChange={(value) => setTempWorker(value)}
              className="rounded-md border-2 border-transparent bg-neutral-900 p-2 text-2xl text-neutral-100 focus:border-sky-600 focus:outline-none"
            />
          </div>
          <button
            onClick={() => handleAddWorker()}
            className="h-10 grow cursor-pointer rounded-md bg-neutral-600 px-4 text-center text-xl transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            disabled={history?.end_time}
          >
            新增
          </button>
        </div>
        {/* show selected workers */}
        <div className="flex flex-wrap gap-5 text-xl">
          {(selectedWorkers ?? []).map((worker, idx) => (
            <div
              key={worker?.id ?? idx}
              className="flex items-center gap-4 rounded-full bg-neutral-600 px-5 py-2"
            >
              {worker?.name}
              {!history?.end_time && (
                <button
                  onClick={() => handleDeleteWorker(worker?.id)}
                  className="h-5 w-5 cursor-pointer rounded-full bg-neutral-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-full w-full text-neutral-600"
                  >
                    <line x1="5" y1="5" x2="15" y2="15" />
                    <line x1="15" y1="5" x2="5" y2="15" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        {/* start timer */}
        <div className="mt-10 flex text-xl">
          <button
            className="w-max cursor-pointer rounded-l-md bg-neutral-600 px-4 py-2 whitespace-nowrap transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleAddStartTime}
            disabled={history?.start_time}
          >
            開始計時
          </button>
          <div className="grow rounded-r-md bg-neutral-900 px-4 py-2">
            {history?.start_time ? (
              new Date(history.start_time).toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })
            ) : (
              <span className="text-neutral-600">尚未開始</span>
            )}
          </div>
        </div>
        {/* stop timer */}
        <div className="flex text-xl">
          <button
            className="w-max cursor-pointer rounded-l-md bg-neutral-600 px-4 py-2 whitespace-nowrap transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleAddEndTime}
            disabled={history?.end_time}
          >
            結束計時
          </button>
          <div className="grow rounded-r-md bg-neutral-900 px-4 py-2">
            {history?.end_time ? (
              new Date(history.end_time).toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })
            ) : (
              <span className="text-neutral-600">尚未結束</span>
            )}
          </div>
        </div>
        {/* display timer */}
        <div className="flex w-max self-end py-2 md:text-3xl">
          <h3
            className={`flex items-center ${!history?.start_time ? "text-neutral-600" : ""}`}
          >
            計時：
          </h3>
          <div className="flex grow items-center justify-center border-b-2 border-neutral-600 pl-2">
            {history?.start_time ? (
              <span>{formatDuration(timer)}</span>
            ) : (
              <span className="text-neutral-600">--:--:--</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
