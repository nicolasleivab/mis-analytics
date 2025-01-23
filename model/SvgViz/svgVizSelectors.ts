import { RootState } from '../store';

export const selectAllSvgParts = (state: RootState) => state.svgViz.svgParts;
export const selectAllClipPaths = (state: RootState) => state.svgViz.clipPaths;

export const selectUniqueSvgParts = (state: RootState) =>
  state.svgViz.uniqueSvgParts;

export const selectSvgLoading = (state: RootState) => state.svgViz.loading;

export const selectSvgError = (state: RootState) => state.svgViz.error;

export const selectPartById = (id: string) => (state: RootState) =>
  state.svgViz.svgParts.find((p) => p.id === id);

export const selectHoveredPart = (state: RootState) => state.svgViz.hoveredPart;

export const selectSvgThresholds = (state: RootState) =>
  state.svgViz.svgThresholds;
