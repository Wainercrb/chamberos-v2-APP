import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IAuthenticateUser } from '../../../types'

const USER_EMPTY_STATE: IAuthenticateUser = {
  id: '',
  email: '',
  username: '',
  authorities: [],
  enabled: false,
  isInitialized: false,
  accountNonLocked: false,
  accountNonExpired: false,
  credentialsNonExpired: false
}

export const userSessionSlice = createSlice({
  name: 'userSession',
  initialState: {
    user: USER_EMPTY_STATE
  },
  reducers: {
    createUserSession: (state, action: PayloadAction<IAuthenticateUser>) => {
      state.user = action.payload
    },
    initializeUserSession: (
      state,
      action: PayloadAction<IAuthenticateUser>
    ) => {
      state.user = action.payload
    },
    updateUserSession: (state, action: PayloadAction<IAuthenticateUser>) => {
      state = { ...state, ...action.payload }
    },
    resetUserSession: (state) => {
      state.user = USER_EMPTY_STATE
    }
  }
})

export const {
  createUserSession,
  updateUserSession,
  resetUserSession,
  initializeUserSession
} = userSessionSlice.actions

export default userSessionSlice.reducer
