import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

// Define a type for the slice state
interface ThemState {
    value: string
  }
  
  // Define the initial state using that type
  const initialState: ThemState = {
    value: "light"
  }
  
  export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      themeSet: (state, action: PayloadAction<string>) => {
         state.value = action.payload
      }
    }
  })
  
  export const {themeSet} = themeSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  export const selectTheme = (state: RootState) => state.theme.value
  
  export default themeSlice.reducer