export const fetchWorkers = async (setWorkers) => {
  try {
    const response = await fetch(`/tasks/workers`, {
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
    setWorkers(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
