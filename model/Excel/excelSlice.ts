import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TExcelData, TExcelSheet, TVariableField } from './definitions';
import { ID_FIELD } from '../definitions/ImportFields';

type ExcelState = {
  sheets: TExcelData;
  variableFields: TVariableField[];
  idField: string;
};

const initialState: ExcelState = {
  sheets: [],
  variableFields: [],
  idField: ID_FIELD,
};

export const excelSlice = createSlice({
  name: 'excelData',
  initialState,
  reducers: {
    setExcelData: (state, action: PayloadAction<TExcelData>) => {
      state.sheets = action.payload;
    },
    setVariableFields: (state, action: PayloadAction<TVariableField[]>) => {
      state.variableFields = action.payload;
    },
    setIdField: (state, action: PayloadAction<string>) => {
      state.idField = action.payload;
    },
    addSheet: (state, action: PayloadAction<TExcelSheet>) => {
      state.sheets.push(action.payload);
    },
    updateSheet: (
      state,
      action: PayloadAction<{ index: number; sheet: TExcelSheet }>
    ) => {
      const { index, sheet } = action.payload;
      if (index >= 0 && index < state.sheets.length) {
        state.sheets[index] = sheet;
      }
    },
    removeSheet: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.sheets.length) {
        state.sheets.splice(index, 1);
      }
    },
  },
});

export const {
  setExcelData,
  setVariableFields,
  setIdField,
  addSheet,
  updateSheet,
  removeSheet,
} = excelSlice.actions;

export default excelSlice.reducer;
