import {configureStore} from "@reduxjs/toolkit";
import chartReducer from "../Components/Chart/chartSlice";
import formReducer from "../Components/Form/formSlice";

const store = configureStore({
  reducer: {
    chart: chartReducer,
    form: formReducer,
  },
});

export default store;
