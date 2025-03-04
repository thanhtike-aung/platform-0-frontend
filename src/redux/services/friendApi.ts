import { Friend, FriendRequestArgs, FriendStatus } from "@/types/friend/common";
import { FriendRequest, User } from "@/types/user/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const friendApi = createApi({
  reducerPath: "friendApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/users/" }),
  tagTypes: ["Friend"],
  endpoints: (builder) => ({
    getFriendByUser: builder.query<
      { status: FriendStatus; data: User }[],
      string
    >({
      query: (id) => `friend/${id}`,
      providesTags: ["Friend"],
    }),
    addFriend: builder.mutation<Friend, FriendRequestArgs>({
      query: (body) => ({
        url: "friend/request",
        method: "POST",
        body,
      }),
    }),
    getFriendRequest: builder.query<FriendRequest[], string>({
      query: (id) => `friend/request/${id}`,
      providesTags: ["Friend"],
    }),
    acceptFriendRequest: builder.mutation<{}, FriendRequestArgs>({
      query: (body) => ({
        url: "friend/accept",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Friend"],
    }),
    declineFriendRequest: builder.mutation<{}, FriendRequestArgs>({
      query: (body) => ({
        url: "friend/decline",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Friend"],
    }),
  }),
});

export const {
  useGetFriendByUserQuery,
  useAddFriendMutation,
  useGetFriendRequestQuery,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} = friendApi;
