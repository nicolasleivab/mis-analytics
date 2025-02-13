import { createAsyncThunk } from '@reduxjs/toolkit';
import { TSvgPart } from './definitions';
import { getSvgVizParts, postSvgPartsToServer } from '../../services';
import { TSvgPartsData } from '../../services/projects/SvgViz/getSvgVizParts';

// Thunk: fetch from the JSON file
export const fetchSvgParts = createAsyncThunk<TSvgPartsData>(
  'svgViz/fetchSvgParts',
  async () => {
    const response = await getSvgVizParts(); // Await the simulated async fetch

    return response; // The resolved array of TSvgPart
  }
);

// Thunk: post to server
export const postSvgParts = createAsyncThunk<void, TSvgPart[]>(
  'svgViz/postSvgParts',
  async (parts) => {
    await postSvgPartsToServer(parts); // Await the simulated async post
    // If success, just return
    // If error, it will throw, triggering "rejected"
  }
);
