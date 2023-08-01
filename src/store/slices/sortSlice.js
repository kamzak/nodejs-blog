import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sort: "ascending",
  },
  reducers: {
    change_sorting: (state, { payload }) => {
      state.sort = payload;
    },
  },
});

export const { change_sorting } = sortSlice.actions;

export default sortSlice.reducer;
