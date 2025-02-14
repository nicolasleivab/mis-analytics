import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_THRESHOLD,
  TSvgPartsData,
  type TClipPath,
  type TExcelData,
  type TSvgPart,
  type TSvgThresholds,
  type TVariableField,
} from './definitions';
import { ID_FIELD } from '../definitions/ImportFields';

type TProjectState = {
  sheets: TExcelData;
  variableFields: TVariableField[];
  idField: string;
  svgParts: TSvgPart[];
  clipPaths: TClipPath[];
  uniqueSvgParts: string[];
  svgThresholds: TSvgThresholds;
  hoveredPart: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: TProjectState = {
  sheets: [],
  variableFields: [],
  idField: ID_FIELD,
  svgParts: [],
  clipPaths: [],
  uniqueSvgParts: [],
  svgThresholds: DEFAULT_THRESHOLD,
  hoveredPart: null,
  loading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: 'projectData',
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
  },
});

export const {
  setExcelData,
  setVariableFields,
  setIdField,
  setHoveredPart,
  setSvgParts,
  setSvgThresholds,
} = projectSlice.actions;

export default projectSlice.reducer;
