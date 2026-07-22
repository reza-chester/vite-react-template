import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

// Define a type for the slice state
interface MenuState {
    value: string
  }
  
  // Define the initial state using that type
  const initialState: MenuState = {
    value: "PersonalView"
  }
  
  export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
      menuSet: (state, action: PayloadAction<string>) => {
         state.value = action.payload
      }
    }
  })
  
  export const {menuSet} = menuSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  export const selectMenu = (state: RootState) => state.menu.value
  
  export default menuSlice.reducer