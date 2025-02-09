import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null, // Store user details
    token: null, // Store auth token
  },
  reducers: {
    addSession: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    removeSession: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions
export const { addSession, removeSession } = sessionSlice.actions;

// Export reducer
export default sessionSlice.reducer;
