import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../store'
export interface UserProfileState {
  avatar: string;
  fullName: string;
  firstName: string;
  lastName: string;
  role: string[];
}

// Define the initial state using that type
const initialState: UserProfileState = {
  avatar: '',
  fullName: '',
  firstName: '',
  lastName: '',
  role: []
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    userProfileSet: (state, action: PayloadAction<UserProfileState>) => {
      Object.assign(state, action.payload);
    },
    userProfileRemove: (state) => {
      Object.assign(state, initialState);
    }
  }
})

export const {userProfileSet,userProfileRemove} = userProfileSlice.actions

export const selectUserProfile = (state: RootState) => state.userProfile

export default userProfileSlice.reducer