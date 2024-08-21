import { configureStore } from '@reduxjs/toolkit'
import { userProfileSlice } from './features/user-state/user-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      userProfile: userProfileSlice.reducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
