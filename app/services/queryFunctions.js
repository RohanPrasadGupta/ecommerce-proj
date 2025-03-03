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
  console.log("toSendData", toSendData);

  try {
    const response = await axios.post(
      `http://localhost:3001/toCart`,
      {
        user: toSendData.user,
        product: toSendData.product,
        quantity: toSendData.quantity,
      },
      {
        withCredentials: true, // Ensure cookies are sent if required
      }
    );

    console.log("Response from axios:", response);
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw new Error("Failed to add product to cart");
  }
};
