import { RootState } from '../store'; // or wherever your store's RootState is located

export const selectAllSheets = (state: RootState) => state.projectData.sheets;

export const selectSheetByIndex = (index: number) => (state: RootState) =>
  state.projectData.sheets[index];

export const selectAllVariableFields = (state: RootState) =>
  state.projectData.variableFields;

export const selectIdField = (state: RootState) => state.projectData.idField;

export const selectAllSvgParts = (state: RootState) =>
  state.projectData.svgParts;
export const selectAllClipPaths = (state: RootState) =>
  state.projectData.clipPaths;

export const selectUniqueSvgParts = (state: RootState) =>
  state.projectData.uniqueSvgParts;

export const selectSvgLoading = (state: RootState) =>
  state.projectData.isLoading;

export const selectSvgError = (state: RootState) => state.projectData.error;

export const selectPartById = (id: string) => (state: RootState) =>
  state.projectData.svgParts.find((p) => p.id === id);

export const selectHoveredPart = (state: RootState) =>
  state.projectData.hoveredPart;

export const selectSvgThresholds = (state: RootState) =>
  state.projectData.svgThresholds;

export const selectCurrentProject = (state: RootState) =>
  state.projectData.currentProject;

export const selectUpdateMode = (state: RootState) =>
  state.projectData.updateMode;
