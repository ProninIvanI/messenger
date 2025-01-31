import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: null,
  currentChannel: null,
  channelsUser: null,
  usersCurrentChannel: null,
  adminCurrentChannel: null,
  sortedListUsersCurrentChannel: null,
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
    loadUsersCurrentChannelInStore(state, action) {
      state.usersCurrentChannel = action.payload;
    },
    addUserOnChannel(state, action) {
      state.usersCurrentChannel = action.payload;
    },
    loadAdminCurrentChannel(state, action) {
      state.adminCurrentChannel = action.payload;
    },
    deleteUserOnChannel(state, action) {
      state.usersCurrentChannel = action.payload;
    },
    loadSortedListUsersCurrentChannel(state, action) {
      state.sortedListUsersCurrentChannel = action.payload;
    }
  },
});

export const {
  loadChannelsInStore,
  loadCurrentChannelInStore,
  loadChannelsUserInStore,
  addChannel,
  loadUsersCurrentChannelInStore,
  addUserOnChannel,
  loadAdminCurrentChannel,
  deleteUserOnChannel,
  loadSortedListUsersCurrentChannel,
} = informationOfChannelsSlice.actions;

export default informationOfChannelsSlice.reducer;
