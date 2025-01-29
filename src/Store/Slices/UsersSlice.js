import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listUsers: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadListUsers(state, action) {
      state.listUsers = action.payload;
    },
  }
});

export const { loadListUsers } = userSlice.actions;

export default userSlice.reducer;