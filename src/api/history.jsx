export const fetchHistoryByTaskId = async (taskId, setHistory) => {
  try {
    let url = `/tasks/${taskId}/history`;
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
    setHistory((prev) => ({
      ...prev,
      ...Object.fromEntries((data.histories || []).map((h) => [h.item_id, h])),
    }));
  } catch (error) {
    console.error("Error fetching history by task id:", error);
  }
};

export const upsertHistory = async (historyData) => {
  try {
    let checkUrl = `/tasks/${historyData.task_id}/history`;
    if (import.meta.env.VITE_NODE_ENV === "production") {
      console.log("in production!!!");
      checkUrl = `${import.meta.env.VITE_API_URL}${checkUrl}`;
    }
    console.log("checkUrl: ", checkUrl);
    // 1. Fetch all histories for the task
    const res = await fetch(checkUrl, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
    });

    // if (!res.ok) {
    //   throw new Error("Failed to fetch histories for upsert");
    // }

    const data = await res.json();
    const histories = data.histories || [];

    // 2. Try to find an existing history for this item_id
    const existing = histories.find((h) => h.item_id === historyData.item_id);
    console.log("existing data: ", existing);

    // 3. Set URL and method based on existence
    let url = "/tasks/history";
    let method = "POST";
    if (existing) {
      url = `/tasks/history/${existing.history_id}`;
      method = "PUT";
    }
    console.log("url: ", url);
    console.log("method: ", method);
    if (import.meta.env.VITE_NODE_ENV === "production") {
      console.log("in production!!!");
      url = `${import.meta.env.VITE_API_URL}${url}`;
    }

    // 4. Use one fetch call for both create and update
    const response = await fetch(url, {
      method,
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        existing ? { ...existing, ...historyData } : historyData,
      ),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to ${method === "POST" ? "create" : "update"} history`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error upserting history:", error);
    throw error;
  }
};
