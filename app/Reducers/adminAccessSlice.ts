import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface AdminAccessState {
  value: string
}

// Define the initial state using that type
const initialState: AdminAccessState = {
  value: ""
}

export const adminAccessSlice = createSlice({
  name: 'adminAccess',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    adminAccessSet: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const {adminAccessSet} = adminAccessSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAdminAccess = (state: RootState) => state.adminAccess.value

export default adminAccessSlice.reducer