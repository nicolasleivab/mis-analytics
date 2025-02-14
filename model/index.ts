// Utils
export { useAppDispatch, useAppSelector } from './store';

// Excel
export {
  setExcelData,
  setVariableFields,
  setIdField,
} from './Excel/excelSlice';
export {
  selectAllSheets,
  selectSheetByIndex,
  selectAllVariableFields,
  selectIdField,
} from './Excel/excelSelectors';
export type {
  TExcelData,
  TExcelSheet,
  TVariableField,
  TVariableType,
} from './Excel/definitions';

// SvgViz
export {
  setSvgParts,
  setHoveredPart,
  setSvgThresholds,
} from './SvgViz/svgVizSlice';
export {
  selectAllSvgParts,
  selectAllClipPaths,
  selectUniqueSvgParts,
  selectSvgLoading,
  selectSvgError,
  selectHoveredPart,
  selectSvgThresholds,
} from './SvgViz/svgVizSelectors';
export { fetchSvgParts, postSvgParts } from './SvgViz/svgVizThunks';
export type { TSvgPart, TClipPath } from './SvgViz/definitions';

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
