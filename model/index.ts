// Utils
export { useAppDispatch, useAppSelector } from './store';

// Project
export {
  setExcelData,
  setVariableFields,
  setIdField,
  setSvgParts,
  setHoveredPart,
  setSvgThresholds,
  setCurrentProject,
  clearProjectData,
} from './Project/projectSlice';
export {
  selectAllSheets,
  selectSheetByIndex,
  selectAllVariableFields,
  selectIdField,
  selectAllSvgParts,
  selectAllClipPaths,
  selectUniqueSvgParts,
  selectSvgLoading,
  selectSvgError,
  selectHoveredPart,
  selectSvgThresholds,
  selectCurrentProject,
} from './Project/projectSelectors';
export type {
  TExcelData,
  TExcelSheet,
  TVariableField,
  TVariableType,
  TSvgPart,
  TClipPath,
} from './Project/definitions';
export {
  retrieveProject,
  createProject,
  removeProject,
} from './Project/projectThunks';

// User
export { clearError as clearUserError } from './User/userSlice';
export { authenticateUser, logoutUser, registerUser } from './User/userThunks';
export { selectUser } from './User/userSelectors';

// hooks
export {
  useImportFields,
  useSvgUpload,
  useImportSheet,
  useStats,
  useFilteredData,
  useSvgPartSelection,
} from './hooks';
