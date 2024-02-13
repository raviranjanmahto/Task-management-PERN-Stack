import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `api/v1` }),
  reducerPath: "api",
  tagTypes: ["GetTasks", "GetATask", "PostTasks", "PatchTasks", "DeleteTasks"],
  endpoints: builder => ({
    // GET ALL TASKS
    getTask: builder.query({
      query: () => `/tasks`,
      providesTags: ["GetTasks"],
    }),

    // GET SINGLE TASK
    getATask: builder.query({
      query: id => `/tasks/${id}`,
      providesTags: ["GetATasks"],
      cachePolicy: "no-cache",
    }),

    // CREATE TASKS
    postTask: builder.mutation({
      query: ({ title, description, completed }) => ({
        url: "tasks/add",
        method: "POST",
        body: { title, description, completed },
      }),
      providesTags: ["PostTasks"],
      invalidatesTags: ["GetTasks"],
    }),

    // UPDATE TASKS
    patchTask: builder.mutation({
      query: ({ title, description, completed, id }) => ({
        url: `tasks/update/${id}`,
        method: "PATCH",
        body: { title, description, completed },
      }),
      cachePolicy: "no-cache",

      providesTags: ["PatchTasks"],
      invalidatesTags: ["GetTasks"],
    }),

    // DELETE TASKS
    deleteTask: builder.mutation({
      query: id => ({
        url: `tasks/remove/${id}`,
        method: "DELETE",
      }),
      providesTags: ["DeleteTasks"],
      invalidatesTags: ["GetTasks"],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useGetATaskQuery,
  usePostTaskMutation,
  usePatchTaskMutation,
  useDeleteTaskMutation,
} = api;
