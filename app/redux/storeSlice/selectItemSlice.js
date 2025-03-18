import { createSlice } from "@reduxjs/toolkit";

export const selectSlice = createSlice({
  name: "cartSelectItems",
  initialState: {
    value: [],
  },
  reducers: {
    addCheckItem: (state, action) => {
      state.value.push(action.payload);
    },

    removeCheckItem: (state, action) => {
      state.value = state.value.filter(
        (item) => item._id !== action.payload._id
      );
    },
    resetCheckItems: (state) => {
      state.value = [];
    },
  },
});

// Action funtion exports
export const { addCheckItem, removeCheckItem, resetCheckItems } =
  selectSlice.actions;

export default selectSlice.reducer;
