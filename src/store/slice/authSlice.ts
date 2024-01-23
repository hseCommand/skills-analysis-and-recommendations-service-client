// Import createSlice and PayloadAction from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
  isAuthenticated: boolean
  user: string | null
}

// Define the initial state using the initialState variable
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

// Create the authSlice using createSlice from Redux Toolkit
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the authentication status and user
    setAuth: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean; user: string | null }>,
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.user = action.payload.user
    },

    // Action to clear the authentication status
    clearAuth: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

// Export the action creators
export const { setAuth, clearAuth } = authSlice.actions

// Export the reducer as a default export
export default authSlice.reducer
