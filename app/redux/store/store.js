import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../storeSlice/cartSlice";

export default configureStore({
  reducer: {
    cartItems: cartReducer,
  },
});
