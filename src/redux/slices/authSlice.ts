import { decodeJWT, isJWTExpired } from "@/lib/utils";
import { AuthState } from "@/types/auth/common";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("access-token") && !isJWTExpired(localStorage.getItem("access-token")),
  token: null,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.isAuthenticated = true;
      state.token = actions.payload;
      state.currentUser = decodeJWT(actions.payload);
      localStorage.setItem("access-token", actions.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("access-token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
