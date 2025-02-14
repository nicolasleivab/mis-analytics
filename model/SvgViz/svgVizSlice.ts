import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_THRESHOLD,
  TClipPath,
  TSvgPart,
  TSvgPartsData,
  TSvgThresholds,
} from './definitions';

type SvgVizState = {
  svgParts: TSvgPart[];
  clipPaths: TClipPath[];
  uniqueSvgParts: string[];
  svgThresholds: TSvgThresholds;
  hoveredPart: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: SvgVizState = {
  svgParts: [],
  clipPaths: [],
  uniqueSvgParts: [],
  svgThresholds: DEFAULT_THRESHOLD,
  hoveredPart: null,
  loading: false,
  error: null,
};

export const svgVizSlice = createSlice({
  name: 'svgViz',
  initialState,
  reducers: {
    setSvgParts: (state, action: PayloadAction<TSvgPartsData>) => {
      const { svgParts, clipPaths } = action.payload;
      // Assign the parts
      state.svgParts = svgParts;
      state.clipPaths = clipPaths;
      // Also update uniqueSvgParts whenever we set svgParts:
      state.uniqueSvgParts = Array.from(new Set(svgParts.map((p) => p.name)));
    },
    setHoveredPart: (state, action: PayloadAction<string | null>) => {
      state.hoveredPart = action.payload;
    },
    setSvgThresholds: (state, action: PayloadAction<TSvgThresholds>) => {
      state.svgThresholds = action.payload;
    },
    addSvgPart: (state, action: PayloadAction<TSvgPart>) => {
      state.svgParts.push(action.payload);
      // Recompute unique names:
      state.uniqueSvgParts = Array.from(
        new Set(state.svgParts.map((p) => p.name))
      );
    },
    updateSvgPart: (state, action: PayloadAction<TSvgPart>) => {
      const index = state.svgParts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.svgParts[index] = action.payload;
      }
      // Recompute unique names:
      state.uniqueSvgParts = Array.from(
        new Set(state.svgParts.map((p) => p.name))
      );
    },
    removeSvgPart: (state, action: PayloadAction<string>) => {
      state.svgParts = state.svgParts.filter((p) => p.id !== action.payload);
      // Recompute unique names:
      state.uniqueSvgParts = Array.from(
        new Set(state.svgParts.map((p) => p.name))
      );
    },
    clearSvgParts: (state) => {
      state.svgParts = [];
      state.uniqueSvgParts = [];
    },
  },
});

// Export actions for usage in components
export const {
  setSvgParts,
  addSvgPart,
  setHoveredPart,
  setSvgThresholds,
  updateSvgPart,
  removeSvgPart,
  clearSvgParts,
} = svgVizSlice.actions;

export default svgVizSlice.reducer;
