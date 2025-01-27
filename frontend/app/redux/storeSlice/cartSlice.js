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
            item.quantity = item.quantity + action.payload.quantity;
          }
        });
      } else {
        state.value.push(action.payload);
      }
    },
    incrementItem: (state, action) => {
      state.value.map((item) => {
        console.log(item);

        if (item.id === action.payload.id) {
          item.quantity = item.quantity + 1;
        }
      });
    },
    decrementItem: (state, action) => {
      state.value.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity - 1;
        }
      });
    },
    removeItem: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
  },
});

// Action funtion exports
export const { addItem, removeItem, incrementItem, decrementItem } =
  cartSlice.actions;

export default cartSlice.reducer;
