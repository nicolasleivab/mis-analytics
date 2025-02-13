import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../services/users/loginUser';
import { TError } from '../../services/api';

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
