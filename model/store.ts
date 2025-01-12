import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './User/userSlice';
import excelReducer from './Excel/excelSlice';

export const store = configureStore({
  reducer: {
    // user: userReducer,
    excelData: excelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// RootState and AppDispatch for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
