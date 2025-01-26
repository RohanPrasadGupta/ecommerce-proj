import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    value: [],
  },
  reducers: {
    addItem: (state, action) => {
      if (state.value.find((item) => item.id === action.payload.id)) {
        state.value.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += 1;
          }
        });
      } else {
        state.value.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
  },
});

// Action funtion exports
export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
