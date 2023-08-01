import { configureStore } from "@reduxjs/toolkit";
import sortSlice from "./slices/sortSlice";

export default configureStore({
  reducer: {
    sort: sortSlice,
  },
});
