import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchUserOnChannel: "",
  searchUserAtAdded: "",
  searchChannelUser: "",
  searchChannelAmongAllChannel: "",
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
      state.searchChannelUser = action.payload;
    },
    loadSearchChannelAmongAllChannel(state, action) {
      state.searchChannelAmongAllChannel = action.payload;
    },
  },
});

export const {
  loadSearchUserOnChannel,
  loadSearchUserAtAdded,
  loadSearchChannel,
  loadSearchChannelAmongAllChannel,
} = searchSlice.actions;

export default searchSlice.reducer;
