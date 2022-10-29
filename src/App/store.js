import {configureStore} from "@reduxjs/toolkit";
import chartReducer from "../Components/Chart/chartSlice";
import formReducer from "../Components/Form/formSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import {combineReducers} from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  chart: chartReducer,
  form: formReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
