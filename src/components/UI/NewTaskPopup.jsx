import { useState, useEffect, useContext } from "react";
import TaskContext from "../../context/TaskContext";
import { createNewTask, updateTaskStatus } from "../../api/tasks";
import { ComboboxCreate } from "../HeadlessUI/ComboboxCreate";
export const NewTaskPopup = ({ toggle }) => {
  const [, setTasks, date] = useContext(TaskContext);
  const [tempDate, setTempDate] = useState(date || "");
  const [tempWeight, setTempWeight] = useState(1);
  useEffect(() => {
    setTempDate(date);
  }, [date]);
  const [tempProduct, setTempProduct] = useState("");
  const addNewTask = async () => {
    const newTask = {
      product_name: String(tempProduct.name),
      weight: parseFloat(Number(tempWeight).toFixed(1)),
      date: String(tempDate),
      // status: "pending",
    };
    const response = await createNewTask(newTask);
    if (response && tempDate === date) {
      const createdNewTask = {
        id: response.task_id,
        product: newTask.product_name,
        status: "pending",
        ...newTask,
      };
      console.log("createdNewTask: ", createdNewTask);
      // updateTaskStatus(createdNewTask, "pending");
      setTasks((prev) => [...prev, createdNewTask]);
      toggle((prev) => !prev);
    }
  };
  return (
    <div className="fixed top-0 left-0 z-20">
      <div
        onClick={() => toggle((prev) => !prev)}
        className="h-screen w-screen overflow-hidden backdrop-blur-xs"
      />
      <div className="fixed top-1/2 left-1/2 z-30 flex h-5/6 w-5/6 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-10 overflow-hidden rounded-md bg-neutral-800 p-4 text-xl md:h-[32rem] md:w-[40rem] md:p-10 md:text-2xl">
        <h3 className="text-3xl font-bold">新增工單</h3>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            addNewTask();
          }}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex items-center">
            <label htmlFor="date" className="break-keep">
              日期：
            </label>
            <input
              type="date"
              id="newTaskDate"
              name="new-task-date"
              value={tempDate}
              min="2025-08-25"
              max="2025-09-05"
              className="custom-date-input h-12 rounded-md border border-neutral-400 px-1 ring-sky-300 transition-all outline-none focus:border-sky-300 focus:ring"
              onChange={(e) => setTempDate(e.target.value)}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="product" className="break-keep">
              產品：
            </label>
            <div className="grow">
              <ComboboxCreate
                name="產品名稱"
                options={[{ id: 0, name: "黃金泡菜" }]}
                value={tempProduct}
                onChange={(value) => setTempProduct(value)}
                className="rounded-md border-2 border-transparent bg-neutral-900 p-2 text-neutral-100 focus:border-sky-600 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="weight" className="break-keep">
              重量：
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={tempWeight}
              onChange={(e) => {
                // Only allow numbers and prevent non-numeric input
                const value = e.target.value;
                // Allow empty string for controlled input, otherwise only digits
                if (value === "" || /^\d+$/.test(value)) {
                  setTempWeight(e.target.value);
                }
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              min="1"
              className="w-20 rounded-md border-2 border-transparent bg-neutral-900 p-2 text-neutral-100 focus:border-sky-600 focus:outline-none"
            />
            <span className="text-neutral-400"> 公斤</span>
          </div>

          <button
            type="submit"
            className="mt-10 cursor-pointer rounded-md bg-neutral-600 px-4 py-2 font-bold transition-all hover:scale-105 active:scale-95"
          >
            新增
          </button>
        </form>
      </div>
    </div>
  );
};
