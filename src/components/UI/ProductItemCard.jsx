import { useState } from "react";
import { ComboboxCreate } from "../HeadlessUI/ComboboxCreate";

export const ProductItemCard = ({
  item,
  workers,
  selectedWorkers,
  setSelectedWorkers,
}) => {
  const [tempWorker, setTempWorker] = useState([]);

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
            onClick={() => (
              setSelectedWorkers((prev) => {
                const currentList = prev[item.id] ?? [];
                // Only add tempWorker if not already present (by id)
                if (
                  tempWorker &&
                  tempWorker.id != null &&
                  !currentList.some((w) => w.id === tempWorker.id)
                ) {
                  return {
                    ...prev,
                    [item.id]: [...currentList, tempWorker],
                  };
                }
                return prev;
              }),
              setTempWorker([])
            )}
            className="h-10 grow cursor-pointer rounded-md bg-neutral-600 px-4 text-center text-xl transition-all hover:scale-105 active:scale-95"
          >
            新增
          </button>
        </div>
        {/* show selected workers */}
        <div className="flex flex-wrap gap-5 text-xl">
          {(selectedWorkers?.[item.id] ?? []).map((worker, idx) => (
            <div
              key={worker.id ?? idx}
              className="flex items-center gap-4 rounded-full bg-neutral-600 px-5 py-2"
            >
              {worker.name}
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
      </div>
    </div>
  );
};
