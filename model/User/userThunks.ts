import { createAsyncThunk } from '@reduxjs/toolkit';
import { TError } from '../../services/api';
import { getUser, loginUser } from '../../services/users';

export const authenticateUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await loginUser(email, password);
      if (res.data && 'user' in res.data) {
        return res.data.user;
      } else {
        throw new Error('User data not found');
      }
    } catch (error: unknown) {
      const typedError = error as TError;
      return thunkAPI.rejectWithValue(typedError.message || 'Login failed');
    }
  }
);

export const verifyUser = createAsyncThunk(
  'auth/verify',
  async (_, thunkAPI) => {
    try {
      const res = await getUser();
      if (res.data && 'user' in res.data) {
        return res.data.user;
      } else {
        throw new Error('User data not found');
      }
    } catch (error: unknown) {
      const typedError = error as TError;
      return thunkAPI.rejectWithValue(
        typedError.message || 'Verification failed'
      );
    }
  }
);
