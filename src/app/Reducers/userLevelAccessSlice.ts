import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../store'

// Define a type for the slice state
interface UserLevelState {
  value: string
}

// Define the initial state using that type
const initialState: UserLevelState = {
  value: ""
}

export const userLevelAccessSlice = createSlice({
  name: 'levelAccess',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    levelAccessSet: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const {levelAccessSet} = userLevelAccessSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLevelAccess = (state: RootState) => state.levelAccess.value

export default userLevelAccessSlice.reducer