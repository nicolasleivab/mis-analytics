import { createAsyncThunk } from '@reduxjs/toolkit';
import { TError, TProject } from '../../services/definitions';
import { create, remove, retrieve } from '../../services/projects';

export const createProject = createAsyncThunk(
  'project/create',
  async (projectData: TProject, thunkAPI) => {
    try {
      const res = await create(projectData);

      if (res.data && 'project' in res.data) {
        return res.data.project;
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error: unknown) {
      const typedError = error as TError;
      return thunkAPI.rejectWithValue(
        typedError?.response?.data?.message ||
          typedError?.message ||
          'Failed to create project'
      );
    }
  }
);

export const retrieveProject = createAsyncThunk(
  'project/retrieve',
  async (id: string, thunkAPI) => {
    try {
      const res = await retrieve(id);
      if (res.data && 'project' in res.data) {
        return res.data.project;
      } else {
        throw new Error('Project not found');
      }
    } catch (error: unknown) {
      const typedError = error as TError;
      return thunkAPI.rejectWithValue(
        typedError?.response?.data?.message ||
          typedError?.message ||
          'Failed to retrieve project'
      );
    }
  }
);

export const removeProject = createAsyncThunk(
  'project/remove',
  async (id: string, thunkAPI) => {
    try {
      const res = await remove(id);
      if (res.message && res.id) {
        return res;
      } else {
        throw new Error('Failed to remove project');
      }
    } catch (error: unknown) {
      const typedError = error as TError;
      return thunkAPI.rejectWithValue(
        typedError?.response?.data?.message ||
          typedError?.message ||
          'Failed to remove project'
      );
    }
  }
);
