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

export const createNewTask = async (newTask) => {
  console.log("newTask: ", newTask);
  try {
    const response = await fetch("/tasks", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Created new task:", data);
    return data;
  } catch (error) {
    console.error("Error creating new task:", error);
    throw error;
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
