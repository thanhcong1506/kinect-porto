import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface LoginPayload {
  email: string;
  password: string;
}

interface UserState {
  currentUser: string | null;
  loading: boolean;
  error: boolean;
}
interface InitialState {
  value: UserState;
}

const initialState = {
  value: {
    currentUser: "",
    loading: false,
    error: false,
  } as UserState,
} as InitialState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state, action: PayloadAction<LoginPayload>) => {
      return {
        value: {
          currentUser: null,
          loading: true,
          error: false,
        },
      };
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      return {
        value: {
          currentUser: action.payload,
          loading: false,
          error: false,
        },
      };
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      return {
        value: {
          currentUser: null,
          loading: false,
          error: false,
        },
      };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
