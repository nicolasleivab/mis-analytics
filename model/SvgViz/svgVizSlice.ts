import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TClipPath, TSvgPart } from './definitions';
import { fetchSvgParts, postSvgParts } from './svgVizThunks';
import { TSvgPartsData } from '../../services/api/SvgViz/getSvgVizParts';

type SvgVizState = {
  svgParts: TSvgPart[];
  clipPaths: TClipPath[];
  uniqueSvgParts: string[];
  loading: boolean;
  error: string | null;
};

const initialState: SvgVizState = {
  svgParts: [],
  clipPaths: [],
  uniqueSvgParts: [],
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
  extraReducers: (builder) => {
    // fetchSvgParts Thunk
    builder.addCase(fetchSvgParts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSvgParts.fulfilled, (state, action) => {
      state.loading = false;
      const { svgParts, clipPaths } = action.payload;
      // Assign the parts
      state.svgParts = svgParts;
      state.clipPaths = clipPaths;
      // Then compute the unique names
      state.uniqueSvgParts = Array.from(new Set(svgParts.map((p) => p.name)));
    });
    builder.addCase(fetchSvgParts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to fetch svg parts';
    });

    // postSvgParts Thunk (simulated server POST)
    builder.addCase(postSvgParts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postSvgParts.fulfilled, (state) => {
      state.loading = false;
      // Possibly do something upon success
    });
    builder.addCase(postSvgParts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to post svg parts';
    });
  },
});

// Export actions for usage in components
export const {
  setSvgParts,
  addSvgPart,
  updateSvgPart,
  removeSvgPart,
  clearSvgParts,
} = svgVizSlice.actions;

export default svgVizSlice.reducer;
