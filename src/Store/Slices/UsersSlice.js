import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listUsers: null,
  listFilterUsers: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadListUsers(state, action) {
      state.listUsers = action.payload;
    },
    loadListFilterUsers(state, action) {
      state.listFilterUsers = action.payload;
    },
  },
});

export const { loadListUsers, loadListFilterUsers } = usersSlice.actions;

export default usersSlice.reducer;
