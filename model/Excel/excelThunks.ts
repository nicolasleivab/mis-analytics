import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { setExcelData } from './excelSlice';
import { TExcelData } from './definitions';

/**
 * Loads Excel data from localStorage and dispatches setExcelData.
 */
export const loadExcelData = createAsyncThunk(
  'excelData/load',
  (_, { dispatch }) => {
    const savedData = localStorage.getItem('excelData');
    if (savedData) {
      dispatch(setExcelData(JSON.parse(savedData) as TExcelData));
    } else {
      dispatch(setExcelData([]));
    }
  }
);

/**
 * Saves Excel data to localStorage.
 */
export const saveExcelData = createAsyncThunk(
  'excelData/save',
  (_, { getState }) => {
    const state = getState() as RootState;
    const sheets = state.excelData.sheets;
    localStorage.setItem('excelData', JSON.stringify(sheets));
  }
);
