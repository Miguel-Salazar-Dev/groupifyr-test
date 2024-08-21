'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: UserProfile = {
  name: '',
  username: '',
  avatarurl: '',
  group_name: '',
  group_id: '',
  group_backgroud: '',
  group_logo: '',
  group_website: '',
  isAdmin: false
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      return action.payload // Return the new state object
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
