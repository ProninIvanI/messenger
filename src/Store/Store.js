import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice.js";
import messagesReducer from "./Slices/MessagesSlice.js";
import dialedMessageReducer from "./Slices/DialedMessageSlice.js";
import InformationOfChannelsSliceReducer from "./Slices/InformationOfChannelsSlice.js";
import usersSliceReducer from "./Slices/UsersSlice.js"
import searchSliceReducer from "./Slices/SearchSlice.js"

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
    dialedMessage: dialedMessageReducer,
    informationOfChannels: InformationOfChannelsSliceReducer,
    users: usersSliceReducer,
    search: searchSliceReducer,
  },
});

export default store;
