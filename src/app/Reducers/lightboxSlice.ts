import { createSlice, type PayloadAction, type WritableDraft } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { SlideImage } from "yet-another-react-lightbox";

interface LightBoxState {
  value: SlideImage[];
  open:boolean
}

const initialState: LightBoxState = {
  value: [],
  open:false
};

export const lightboxSlice = createSlice({
  name: "lightbox",
  initialState,
  reducers: {
    lightboxSrcSet: (state, action: PayloadAction<WritableDraft<SlideImage[]>>) => {
      state.value = action.payload;
    },
    lightboxOpenSet: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { lightboxSrcSet,lightboxOpenSet } = lightboxSlice.actions;

export const selectLightBoxSrcList = (state: RootState) => state.lightbox.value;
export const selectLightBoxOpen = (state: RootState) => state.lightbox.open;

export default lightboxSlice.reducer;
