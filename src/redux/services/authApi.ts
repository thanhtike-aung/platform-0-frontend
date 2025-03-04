import { LoginRequest } from "@/types/auth/common";
import { User } from "@/types/user/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation<User, any>({
      query: (userData) => {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("address", userData.profile.address);
        formData.append("avatar", userData.profile.avatar);
        formData.append("relationship", userData.profile.relationship);
        formData.append("work", userData.profile.work);
        return {
          url: "/register",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;
