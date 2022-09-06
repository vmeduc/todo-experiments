import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/todos",
  }),
  endpoints: (builder) => ({
    getLimitTodos: builder.query({
      query: (limit) => `?_limit=${limit}`,
      transformResponse: async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return response.map((todo) => ({
          id: todo.id,
          checked: todo.completed,
          text: todo.title,
        }));
      },
    }),
  }),
});

export default todosApi;

export const { useGetLimitTodosQuery } = todosApi;
