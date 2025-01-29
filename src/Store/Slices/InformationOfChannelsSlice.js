import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: null,
  currentChannel: null,
};

const informationOfChannelsSlice = createSlice({
  name: "informationOfChannels",
  initialState,
  reducers: {
    loadChannelsInStore(state, action) {
      state.channels = action.payload;
    },
    loadCurrentChannelInStore(state, action) {
      state.currentChannel = action.payload;
    },
  },
});

export const {
  loadChannelsInStore,
  loadCurrentChannelInStore
} = informationOfChannelsSlice.actions;

export default informationOfChannelsSlice.reducer;
