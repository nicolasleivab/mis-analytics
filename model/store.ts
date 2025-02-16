import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import projectReducer from './Project/projectSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projectData: projectReducer,
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
