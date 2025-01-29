import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: null,
  currentChannel: null,
  channelsUser: null,
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
    loadChannelsUserInStore(state, action) {
      state.channelsUser = action.payload;
    },
    addChannel(state, action) {
      state.channels.push(action.payload)
      state.channelsUser.push(action.payload)
    },
  },
});

export const {
  loadChannelsInStore,
  loadCurrentChannelInStore,
  loadChannelsUserInStore,
  addChannel,
} = informationOfChannelsSlice.actions;

export default informationOfChannelsSlice.reducer;
