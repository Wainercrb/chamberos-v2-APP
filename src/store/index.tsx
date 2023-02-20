import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiChamberos } from "../services/chamberosAPI";
// SLICES
import searchProfessionReducer from './slices/searchProfessionSlice'

const rootReducer = combineReducers({
  [apiChamberos.reducerPath]: apiChamberos.reducer,
  searchProfession: searchProfessionReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiChamberos.middleware),
  devTools: process.env.NODE_ENV !== "production",
});


export default store;