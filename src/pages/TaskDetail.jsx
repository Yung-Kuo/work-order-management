import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import { fetchProductItems } from "../api/products";
import { fetchWorkers } from "../api/workers";
import TaskContext from "../context/TaskContext";
import { ProductItemCard } from "../components/UI/ProductItemCard";

export const TaskDetail = () => {
  const { tid } = useParams();
  const [tasks] = useContext(TaskContext);
  const navigate = useNavigate();
  const task = tasks.find((t) => String(t.id) === String(tid));

  useEffect(() => {
    if (!task) {
      navigate("/", { replace: true });
    }
  }, [task, navigate]);

  const [productItems, setProductItems] = useState({});
  useEffect(() => {
    fetchProductItems(task.product, setProductItems);
  }, [task]);

  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    fetchWorkers(setWorkers);
  }, []);
  const [selectedWorkers, setSelectedWorkers] = useState({});

  return (
    <div className="flex h-full w-full flex-col gap-4 py-10 text-2xl text-neutral-100">
      <div className="grid w-full grid-cols-2 gap-4 rounded-md bg-neutral-700 p-10 text-neutral-300">
        <h4>
          工單：<span className="font-bold text-neutral-100">{task?.id}</span>
        </h4>
        <h4>
          日期：<span className="font-bold text-neutral-100">{task?.date}</span>
        </h4>
        <h4>
          產品名稱：
          <span className="font-bold text-neutral-100">{task?.product}</span>
        </h4>
        <h4>
          重量：
          <span className="font-bold text-neutral-100">{task?.weight} kg</span>
        </h4>
        <h4>
          時間：<span className="font-bold text-neutral-100"></span>
        </h4>
        <h4></h4>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(productItems?.[task?.product] ?? []).map((item) => (
          <ProductItemCard
            item={item}
            workers={workers}
            selectedWorkers={selectedWorkers}
            setSelectedWorkers={setSelectedWorkers}
          />
        ))}
      </div>
    </div>
  );
};
