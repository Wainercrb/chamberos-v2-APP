import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  persistLocalStorage,
} from "../../utilities/localStorage.utility";
import { IAuthenticateUser } from "../../../types";

export const LOCAL_STORAGE_KEY = "user";
const USER_EMPTY_STATE: IAuthenticateUser = {
  email: "",
  username: "",
  accountNonExpired: false,
  accountNonLocked: false,
  authorities: [],
  credentialsNonExpired: false,
  enabled: false,
  id: "",
  isInitialized: false,
};

// const buildAndGetInitialState = (): IAuthenticateUser => {
//   if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
//     return USER_EMPTY_STATE;
//   }
//   return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string);
// };

export const userSessionSlice = createSlice({
  name: "userSession",
  initialState: {
    user: USER_EMPTY_STATE,
  },
  reducers: {
    createUserSession: (state, action: PayloadAction<IAuthenticateUser>) => {
      // persistLocalStorage<IAuthenticateUser>(LOCAL_STORAGE_KEY, action.payload);
      state.user = action.payload;
    },

    initializeUserSession: (
      state,
      action: PayloadAction<IAuthenticateUser>
    ) => {
      // persistLocalStorage<IAuthenticateUser>(LOCAL_STORAGE_KEY, action.payload);
      state.user = action.payload;
    },
    updateUserSession: (state, action: PayloadAction<IAuthenticateUser>) => {
      // persistLocalStorage<IAuthenticateUser>(LOCAL_STORAGE_KEY, result);
      state = { ...state, ...action.payload };
    },
    resetUserSession: (state) => {
      state.user = USER_EMPTY_STATE;
    },
  },
});

export const {
  createUserSession,
  updateUserSession,
  resetUserSession,
  initializeUserSession,
} = userSessionSlice.actions;

export default userSessionSlice.reducer;
