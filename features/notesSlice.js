import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ id: "1", title: "First Post!", content: "Hello!" }];

const notesSlice = createSlice({
  name: "remember leh!!",
  initialState,
  reducers: {
    noteAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { noteAdded } = notesSlice.actions;

export default notesSlice.reducer;
