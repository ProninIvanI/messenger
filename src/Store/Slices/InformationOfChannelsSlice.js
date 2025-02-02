import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: null,
  sortedChannels: null,
  currentChannel: null,
  channelsUser: null,
  sortedChannelsUser: null,
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
    loadSortedChannelsInStore(state, action) {
      state.sortedChannels = action.payload;
    },
    loadCurrentChannelInStore(state, action) {
      state.currentChannel = action.payload;
    },
    loadChannelsUserInStore(state, action) {
      state.channelsUser = action.payload;
    },
    loadSortedChannelsUserInStore(state, action) {
      state.sortedChannelsUser = action.payload;
    },
    addChannel(state, action) {
      state.channels.push(action.payload);
      state.sortedChannels.push(action.payload);
      state.channelsUser.push(action.payload);
      state.sortedChannelsUser.push(action.payload);
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
    },
    addChannelToUser(state, action) {
      state.channelsUser.push(action.payload);
      state.sortedChannelsUser.push(action.payload);
    },
    deleteChannelToUser(state, action) {
      state.channelsUser = state.channelsUser.filter(item => item !== action.payload)
      state.sortedChannelsUser = state.sortedChannelsUser.filter(item => item !== action.payload)
    },
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
  loadSortedChannelsUserInStore,
  loadSortedChannelsInStore,
  addChannelToUser,
  deleteChannelToUser,
} = informationOfChannelsSlice.actions;

export default informationOfChannelsSlice.reducer;
