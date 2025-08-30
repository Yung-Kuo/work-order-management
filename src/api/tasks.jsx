export const fetchTasksByDate = async (setTasks, date) => {
  try {
    const response = await fetch(
      //   "https://b943852f5323.ngrok-free.app/tasks/2025-08-27",
      `/tasks/${date}`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      },
    );
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
