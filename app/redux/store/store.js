import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../storeSlice/cartSlice";
import selectReducer from "../storeSlice/selectItemSlice";

export default configureStore({
  reducer: {
    cartItems: cartReducer,
    cartSelectItems: selectReducer,
  },
});
