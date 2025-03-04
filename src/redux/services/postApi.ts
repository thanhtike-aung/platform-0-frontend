import { Post } from "@/types/post/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: ["Post"],
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<Post, { id: string; body: Partial<Post> }>({
      query: ({ id, body }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deletePost: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
