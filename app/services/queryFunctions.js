import axios from "axios";

export const userCartData = async (id) => {
  try {
    console.log("id from axios", id, typeof id);
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
