import { useState, useEffect, useMemo } from "react";
import { upsertHistory } from "../../api/history";
import { ComboboxCreate } from "../HeadlessUI/ComboboxCreate";

export const ProductItemCard = ({
  task,
  item,
  workers,
  selectedWorkers,
  setSelectedWorkers,
  history,
  setHistory,
}) => {
  const [tempWorker, setTempWorker] = useState([]);
  useEffect(() => {
    console.log(`selectedWorkers[${item.id}]: `, selectedWorkers);
  }, [selectedWorkers]);

  const handleAddWorker = () => {
    setSelectedWorkers((prev) => {
      const currentList = prev[item.id] ?? [];
      if (
        tempWorker &&
        tempWorker.id != null &&
        !currentList.some((w) => w.id === tempWorker.id)
      ) {
        // Create the new list and new state
        const newList = [...currentList, tempWorker];
        const newState = { ...prev, [item.id]: newList };

        // Create the history template with the new, correct data
        const newHistoryTemplate = {
          task_id: task.id,
          product_id: 0,
          item_id: item.id,
          worker_ids: newList.map((w) => w.id), // Use the new list here
          weight: 0,
          start_time: "", // Populate the start time
          end_time: "",
        };

        console.log(
          "Adding worker - Calling upsertHistory with:",
          newHistoryTemplate,
        );
        upsertHistory(newHistoryTemplate);

        // Return the new state to update the component
        return newState;
      }
      return prev;
    });
    setTempWorker([]);
  };
  const handleAddStartTime = async () => {
    // upsert start_time for this item
    const now = new Date().toISOString();
    try {
      // upsertHistory expects: { task_id, item_id, start_time, worker_ids }
      // worker_ids: selectedWorkers is an array of worker objects
      const workerIds = (selectedWorkers ?? []).map((w) => w.id);
      // import u
      // If upsert is successful, update history for this item
      // We assume upsertHistory returns the updated history object
      const newHistoryTemplate = {
        task_id: task.id,
        product_id: 0,
        item_id: item.id,
        worker_ids: workerIds,
        weight: 0,
        start_time: now,
        end_time: history?.end_time || "",
      };
      console.log("newHistoryTemplate: ", newHistoryTemplate);
      const updatedHistory = await upsertHistory(newHistoryTemplate);
      // Update the history state for this item
      if (updatedHistory) {
        // history is an object mapping item.id to history object
        // setHistory is assumed to be available in props
        setHistory((prev) => ({
          ...prev,
          [item.id]: updatedHistory,
        }));
      }

      // Optionally: show feedback or refresh history
    } catch (err) {
      console.error("Failed to upsert start_time:", err);
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
              onChange={(value) =>
                // setSelectedWorkers((prev) => [...prev, value.id])
                setTempWorker(value)
              }
              className="rounded-md border-2 border-transparent bg-neutral-900 p-2 text-2xl text-neutral-100 focus:border-sky-600 focus:outline-none"
            />
          </div>
          <button
            onClick={() => handleAddWorker()}
            className="h-10 grow cursor-pointer rounded-md bg-neutral-600 px-4 text-center text-xl transition-all hover:scale-105 active:scale-95"
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
              <button
                onClick={() =>
                  setSelectedWorkers((prev) => {
                    const currentList = prev[item.id] ?? [];
                    return {
                      ...prev,
                      [item.id]: currentList.filter((w) => w.id !== worker.id),
                    };
                  })
                }
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
            </div>
          ))}
        </div>
        {/* start timer */}
        <div className="mt-10 flex text-xl">
          <button
            className="w-max cursor-pointer rounded-l-md bg-neutral-600 px-4 py-2 transition-all active:scale-95"
            onClick={handleAddStartTime}
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
          <button className="w-max cursor-pointer rounded-l-md bg-neutral-600 px-4 py-2 transition-all active:scale-95">
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
      </div>
    </div>
  );
};
