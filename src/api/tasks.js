export const fetchTasksByDate = async (setTasks, date) => {
  try {
    // const response = await fetch(
    //   `${import.meta.env.VITE_API_URL}/tasks/${date}`,
    // );
    const response = await fetch(
      "https://b943852f5323.ngrok-free.app/tasks/2025-08-26",
    );
    console.log("response: ", response);
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
export const fetchAllTasks = async (setTasks) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
    console.log("response: ", response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log("data:", data);
    setTasks(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
