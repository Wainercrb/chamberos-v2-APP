import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiChamberos } from "../services/chamberosAPI";

const rootReducer = combineReducers({
  [apiChamberos.reducerPath]: apiChamberos.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiChamberos.middleware),
  devTools: process.env.NODE_ENV !== "production",
});


export default store;