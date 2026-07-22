import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

// Define a type for the slice state
interface FileUploadState {
    value?: File[] | undefined
  }
  
  // Define the initial state using that type
  const initialState: FileUploadState = {
    value: []
  }
  
  export const fileUploadSlice = createSlice({
    name: 'fileUpload',
    initialState,
    reducers: {
      fileUploadSet: (state, action: PayloadAction<File[] | undefined>) => {
         state.value = action.payload
      }
    }
  })
  
  export const {fileUploadSet} = fileUploadSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  export const selectFileUpload = (state: RootState) => state.fileUpload.value
  
  export default fileUploadSlice.reducer