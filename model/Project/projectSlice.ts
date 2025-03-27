import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_THRESHOLD,
  TSvgPartsData,
  TUpdateMode,
  type TClipPath,
  type TExcelData,
  type TSvgPart,
  type TSvgThresholds,
  type TVariableField,
} from './definitions';
import { ID_FIELD } from '../definitions/ImportFields';
import { removeProject, retrieveProject, updateProject } from './projectThunks';

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
  currentProject: { name: string; id: string };
  updateMode: TUpdateMode | null;
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
  currentProject: { name: '', id: '' },
  updateMode: null,
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
    setCurrentProject: (
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      state.currentProject = action.payload;
    },
    clearProjectData: (state) => {
      state.sheets = [];
      state.variableFields = [];
      state.idField = ID_FIELD;
      state.svgParts = [];
      state.clipPaths = [];
      state.uniqueSvgParts = [];
      state.svgThresholds = DEFAULT_THRESHOLD;
      state.hoveredPart = null;
      state.currentProject = { name: '', id: '' };
    },
    setUpdateMode: (state, action: PayloadAction<TUpdateMode | null>) => {
      state.updateMode = action.payload;
    },
    addNewSheet: (state, action: PayloadAction<string>) => {
      const updatedSheets = [
        ...state.sheets,
        {
          name: 'New Sheet',
          data: action.payload as unknown as unknown[][],
          filters: state.sheets[0].filters,
        },
      ];
      console.log('updatedSheets', updatedSheets);
      state.sheets = updatedSheets;
      state.updateMode = null;
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

        const {
          data,
          variableFields,
          svgJson,
          clipPathsJson,
          svgThresholds,
          idField,
        } = project;
        state.sheets = data;
        state.idField = idField;
        state.variableFields = variableFields;
        state.idField = idField;
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
      })
      .addCase(removeProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.id === state.currentProject.id) {
          state.sheets = [];
          state.variableFields = [];
          state.idField = ID_FIELD;
          state.svgParts = [];
          state.clipPaths = [];
          state.uniqueSvgParts = [];
          state.svgThresholds = DEFAULT_THRESHOLD;
          state.hoveredPart = null;
          state.currentProject = { name: '', id: '' };
        }
      })
      .addCase(removeProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const project = action.payload;

        const {
          data,
          variableFields,
          svgJson,
          clipPathsJson,
          svgThresholds,
          idField,
          name,
        } = project;
        state.sheets = data;
        state.idField = idField;
        state.variableFields = variableFields;
        state.idField = idField;
        const parsedSvgJson = svgJson;
        state.svgParts = parsedSvgJson;
        state.clipPaths = clipPathsJson;
        state.uniqueSvgParts = Array.from(
          new Set(parsedSvgJson.map((p) => p.name))
        );
        state.svgThresholds = svgThresholds;
        state.currentProject = { name: name, id: state.currentProject.id };
      })
      .addCase(updateProject.rejected, (state, action) => {
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
  setCurrentProject,
  clearProjectData,
  setUpdateMode,
  addNewSheet,
} = projectSlice.actions;

export default projectSlice.reducer;
