import axios from "axios";

export const userCartData = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/toCart?UserId=${id}`,
      {
        withCredentials: true,
      }
    );
    console.log("response from axios", response);

    return response.data; // axios stores response data in `data`
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw new Error("Failed to fetch cart details");
  }
};

export const addProductToCart = async (toSendData) => {
  try {
    console.log("Sending request with data:", toSendData);
    // const url = "http://localhost:3001/toCart";
    const url = "https://e-combackend-jbal.onrender.com/toCart";
    const response = await axios.post(url, toSendData, {
      withCredentials: true,
      xsrfCookieName: "cookieTCart",
    });

    console.log("Response from axios:", response);
    return response.data;
  } catch (error) {
    console.error("Full error:", error);
    throw new Error("Failed to add product to cart");
  }
};
