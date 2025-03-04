import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import authReducer from "./slices/authSlice";
import { authApi } from "./services/authApi";
import { postApi } from "./services/postApi";
import { friendApi } from "./services/friendApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [friendApi.reducerPath]: friendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      postApi.middleware,
      friendApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
