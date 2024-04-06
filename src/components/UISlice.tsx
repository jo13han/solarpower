import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

export type UiState = {
  currentScreenshot: any;
  croppedScreenshot: any;
  currentSolar: any;
};

const initialUiState: UiState = {
  currentScreenshot: null,
  croppedScreenshot: null,
  currentSolar: null,
};

export const fetchSolar = createAsyncThunk("ui/fetchSolar", async ({ lat, lng }: { lat: number; lng: number }) => {
  if (!lat || !lng) return {};
  const response: any = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}, ${lng}/last30days?key=KDSAYPR7BZFN8QSTA33EFZTFK&include=days`
  );
  console.log(response?.data);
  if (!response?.data) return {};
  return response?.data;
});

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    saveScreenshot: (state, action) => {
      state.currentScreenshot = action.payload;
    },
    saveCrop: (state, action) => {
      state.croppedScreenshot = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSolar.fulfilled, (state, action) => {
      if (action.payload) {
        state.currentSolar = action.payload?.days[0]?.solarenergy;
      }
    });
  },
});

export const { saveScreenshot, saveCrop } = uiSlice.actions;

export default uiSlice.reducer;
