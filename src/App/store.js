import {configureStore} from "@reduxjs/toolkit";
import chartReducer from "../Components/Chart/chartSlice";

const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});

export default store;
