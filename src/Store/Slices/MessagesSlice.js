import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    loadMessageInStore(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload)
    },
  }
});

export const { loadMessageInStore, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;