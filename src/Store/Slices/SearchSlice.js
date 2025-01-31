import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchUserOnChannel: "",
  searchUserAtAdded: "",
  searchChannel: "",
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
    loadSearchChannel(state, action) {
      state.searchChannel = action.payload;
    },
  },
});

export const {
  loadSearchUserOnChannel,
  loadSearchUserAtAdded,
  loadSearchChannel,
} = searchSlice.actions;

export default searchSlice.reducer;
