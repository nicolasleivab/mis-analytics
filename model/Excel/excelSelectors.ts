import { RootState } from '../store'; // or wherever your store's RootState is located

export const selectAllSheets = (state: RootState) => state.excelData.sheets;

export const selectSheetByIndex = (index: number) => (state: RootState) =>
  state.excelData.sheets[index];
