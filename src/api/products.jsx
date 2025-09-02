export const fetchProductItems = async (product_name, setProductItems) => {
  try {
    let url = `/products/${product_name}/items`;
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
    // console.log("data: ", data);
    setProductItems((prev) => ({
      ...prev,
      [product_name]: data,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
