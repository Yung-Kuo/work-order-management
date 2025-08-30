export const fetchProductItems = async (product_name, setProductItems) => {
  try {
    const response = await fetch(`/products/${product_name}/items`, {
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
    setProductItems((prev) => ({
      ...prev,
      [product_name]: data,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
