import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type ModalName = string | null;

export interface BaseModalProps {
  closeAction?:()=> void,
  title: string;
  subTitle?: string;
  shareItems?:unknown
  submitText:string
  type?:string

}

interface ModalState {
  name: ModalName;
  props?: Record<string, unknown> | BaseModalProps;
}
// Define the initial state using that type
const initialState: ModalState = {
  name: null,
  props:{}
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ name: ModalName; props?: Record<string, unknown> | BaseModalProps }>) => {
      state.name = action.payload.name;
      state.props = action.payload.props || {};
    },
    closeModal: (state) => {
      state.name = null;
      state.props = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
