import { User } from "@/types/user/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
