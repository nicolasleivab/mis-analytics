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
import { retrieveProject } from './projectThunks';

type TProjectState = {
  sheets: TExcelData;
  variableFields: TVariableField[];
  idField: string;
  svgParts: TSvgPart[];
  clipPaths: TClipPath[];
  uniqueSvgParts: string[];
  svgThresholds: TSvgThresholds;
  hoveredPart: string | null;
  error: string | null;
  isLoading: boolean;
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
  error: null,
  isLoading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(retrieveProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(retrieveProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const project = action.payload;

        const { data, variableFields, svgJson, clipPathsJson, svgThresholds } =
          project;
        state.sheets = data;
        state.variableFields = variableFields;
        state.idField = ID_FIELD;
        const parsedSvgJson = svgJson;
        state.svgParts = parsedSvgJson;
        state.clipPaths = clipPathsJson;
        state.uniqueSvgParts = Array.from(
          new Set(parsedSvgJson.map((p) => p.name))
        );
        state.svgThresholds = svgThresholds;
      })
      .addCase(retrieveProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
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
