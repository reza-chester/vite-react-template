import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface TokenState {
  value: string | null
}

// Define the initial state using that type
const initialState: TokenState = {
  value: null
}

export const tokenSlice = createSlice({
  name: 'token',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    tokenRemove: state => {
      state.value = null
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    tokenSet: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const {tokenRemove,tokenSet} = tokenSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.token.value

export default tokenSlice.reducer