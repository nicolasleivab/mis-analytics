import { createAsyncThunk } from '@reduxjs/toolkit';
import { TError } from '../../services/definitions';
import { self, login, logout, register } from '../../services/users';

export const authenticateUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await login(email, password);
      if (res.data && 'user' in res.data) {
        return res.data.user;
      } else {
        throw new Error('User data not found');
      }
    } catch (error: unknown) {
      const typedError = error as TError;
      return thunkAPI.rejectWithValue(
        typedError.response.data.message ??
          (typedError.message || 'Login failed')
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await register(email, password);
      if (res.data && 'user' in res.data) {
        return res.data.user;
      } else {
        throw new Error('User data not found');
      }
    } catch (error: unknown) {
      const typedError = error as TError;

      return thunkAPI.rejectWithValue(
        typedError.response.data.message ??
          (typedError.message || 'Registration failed')
      );
    }
  }
);

export const verifyUser = createAsyncThunk(
  'auth/verify',
  async (_, thunkAPI) => {
    try {
      const res = await self();
      if (res.data && 'user' in res.data) {
        return res.data.user;
      } else {
        throw new Error('User data not found');
      }
    } catch (error: unknown) {
      const typedError = error as TError;
      return thunkAPI.rejectWithValue(
        typedError.response.data.message ??
          (typedError.message || 'Verification failed')
      );
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await logout();
  } catch (error: unknown) {
    const typedError = error as TError;
    throw new Error(typedError.message || 'Logout failed');
  }
});
