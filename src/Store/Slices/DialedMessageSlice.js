import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dialedMessage: '',
}

const dialedMessageSlice = createSlice({
  name: 'dialedMessage',
  initialState,
  reducers: {
    loadDialedMessageInStore(state, action) {
      state.dialedMessage = action.payload;
    },
  }
});

export const { loadDialedMessageInStore } = dialedMessageSlice.actions;

export default dialedMessageSlice.reducer;