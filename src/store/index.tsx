import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
// SERVICES
import { apiChamberos } from '../services/chamberosAPI'
// SLICES
import searchProfessionReducer from './slices/searchProfessionSlice'
import userSessionReducer from './slices/userSessionSlice'

const rootReducer = combineReducers({
  [apiChamberos.reducerPath]: apiChamberos.reducer,
  searchProfession: searchProfessionReducer,
  userSession: userSessionReducer
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiChamberos.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
