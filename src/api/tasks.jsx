export const fetchTasksByDate = async (setTasks, date) => {
  try {
    const response = await fetch(`/tasks/${date}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data: ", data);
    setTasks(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateTaskStatus = async (task, status) => {
  try {
    const response = await fetch(`/tasks/${task.id}/status`, {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, status: status }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data: ", data.new_status);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
