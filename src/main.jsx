import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import { TaskDashboard } from "./pages/TaskDashboard.jsx";
import { TaskDetail } from "./pages/TaskDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: TaskDashboard,
      },
      {
        path: "task/:tid",
        Component: TaskDetail,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <RouterProvider router={router} />,
);
