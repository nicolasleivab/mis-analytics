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
  setUpdateMode,
  addNewSheet,
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
  selectUpdateMode,
} from './Project/projectSelectors';
export type {
  TExcelData,
  TExcelSheet,
  TVariableField,
  TVariableType,
  TSvgPart,
  TClipPath,
  TUpdateMode,
} from './Project/definitions';
export { UPDATE_OPTIONS } from './Project/definitions';
export {
  retrieveProject,
  createProject,
  removeProject,
  updateProject,
} from './Project/projectThunks';

// User
export {
  clearError as clearUserError,
  setGuestUser,
  logoutGuestUser,
} from './User/userSlice';
export { authenticateUser, logoutUser, registerUser } from './User/userThunks';
export { selectUser } from './User/userSelectors';
export { GUEST_ID } from './User/definitions';

// hooks
export {
  useImportFields,
  useSvgUpload,
  useImportSheet,
  useStats,
  useFilteredData,
  useSvgPartSelection,
} from './hooks';
