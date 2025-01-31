import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchUserOnChannel: "",
  searchUserAtAdded: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    loadSearchUserOnChannel(state, action) {
      state.searchUserOnChannel = action.payload;
    },
    loadSearchUserAtAdded(state, action) {
      state.searchUserAtAdded = action.payload;
    },
  },
});

export const { loadSearchUserOnChannel, loadSearchUserAtAdded } =
  searchSlice.actions;

export default searchSlice.reducer;
