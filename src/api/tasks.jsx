export const fetchTasksByDate = async (setTasks, date) => {
  try {
    let url = `/tasks/${date}`;
    // if (import.meta.env.VITE_NODE_ENV === "production") {
    //   console.log("in production!!!");
    //   url = `${import.meta.env.VITE_API_URL}${url}`;
    // }
    // console.log("url: ", url);
    const response = await fetch(url, {
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

export const fetchTaskById = async (taskId, setTasks) => {
  try {
    let url = `/tasks/ids/${taskId}`;
    if (import.meta.env.VITE_NODE_ENV === "production") {
      console.log("in production!!!");
      url = `${import.meta.env.VITE_API_URL}${url}`;
    }
    console.log("url: ", url);
    const response = await fetch(url, {
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
    setTasks([data]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createNewTask = async (newTask) => {
  console.log("newTask: ", newTask);
  try {
    let url = `/tasks`;
    if (import.meta.env.VITE_NODE_ENV === "production") {
      console.log("in production!!!");
      url = `${import.meta.env.VITE_API_URL}/tasks`;
    }
    console.log("url: ", url);
    const response = await fetch(url, {
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
    let url = `/tasks/${task.id}/status`;
    if (import.meta.env.VITE_NODE_ENV === "production") {
      console.log("in production!!!");
      url = `${import.meta.env.VITE_API_URL}${url}`;
    }
    console.log("url: ", url);
    const response = await fetch(url, {
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
