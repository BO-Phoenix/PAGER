import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
};

const dataSlice = createSlice({
  name: 'pagerData',
  initialState,
  reducers: {
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { updateUserId } = dataSlice.actions;

export default dataSlice.reducer;