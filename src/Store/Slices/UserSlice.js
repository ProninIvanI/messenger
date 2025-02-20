import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccessAddUserName(state, action) {
      state.user = action.payload;
    },
  }
});

export const { loginSuccessAddUserName } = userSlice.actions;

export default userSlice.reducer;