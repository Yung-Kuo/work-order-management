export const fetchWorkers = async (setWorkers) => {
  try {
    let url = `/tasks/workers`;
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
    setWorkers(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
