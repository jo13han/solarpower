import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import FormData from "form-data";

export type UiState = {
  currentScreenshot: any;
  croppedScreenshot: any;
  currentSolar: any;
  lat: number | null;
  lng: number | null;
  add: string | null;
  processedArea: number | null;
  processedImg: any;
};

const initialUiState: UiState = {
  currentScreenshot: null,
  croppedScreenshot: null,
  currentSolar: null,
  lat: null,
  lng: null,
  processedArea: null,
  processedImg: null,
  add: null,
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

export const processImage = createAsyncThunk("ui/imgProcess", async ({ croppedImage }: { croppedImage: any }) => {
  let data = new FormData();
  let res = await fetch(croppedImage);
  let blobs = await res.blob();
  let imgFile = new File([blobs], "cropp", { type: "image/jpeg" });
  console.log(croppedImage);
  console.log("sendd");
  data.append("image", imgFile);
  console.log(data);
  axios
    .post("https://d0f4-103-169-236-165.ngrok-free.app/", data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data`,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error: any) => {
      console.log(error);
      return null;
    });
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
    saveCords: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    saveAdd: (state, action) => {
      state.add = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSolar.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentSolar = action.payload?.days[0]?.solarenergy;
        }
      })
      .addCase(processImage.fulfilled, (state, action: any) => {
        if (action.payload == null) return;
        state.processedArea = action.payload?.area;
        state.processedImg = "data:image/jpeg;base64," + action.payload?.image;
      });
  },
});

export const { saveScreenshot, saveCrop, saveCords, saveAdd } = uiSlice.actions;

export default uiSlice.reducer;
