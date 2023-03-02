import {Todo} from '@todo/domain/todo/Todo';
import {TodoId} from '@todo/domain/todo/TodoId';

import {appApi} from '@app/services/redux/appApi';

export const todoApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation<Todo, Todo>({
      invalidatesTags: () => [{id: 'LIST', type: 'Todo'}],
      query: ({title, description}) => {
        const parameter = JSON.stringify({
          description,
          title: title.toString(),
        });
        return {
          method: 'POST',
          parameter,
          path: '/todo',
        };
      },
      transformResponse: (res: any /*FIXME: types*/) => {
        return Todo.create({
          description: res.description,
          id: res.id,
          title: res.title,
        });
      },
    }),
    deleteTodo: builder.mutation<void, TodoId>({
      invalidatesTags: (result, error, id) => [{id, type: 'Todo'}],
      query: (id) => {
        return {
          method: 'DELETE',
          path: `/todo/${id}`,
        };
      },
    }),
    getTodo: builder.query<Todo, TodoId>({
      providesTags: (result, error, id) => [{id: id, type: 'Todo'}],
      query: (id) => {
        return {
          method: 'GET',
          path: `/todo/${id}`,
        };
      },
      transformResponse: (res: any /*FIXME: types*/) => {
        return Todo.create({
          description: res.description,
          id: res.id,
          title: res.title,
        });
      },
    }),
    getTodoList: builder.query<Todo[], void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({id}) => ({id, type: 'Todo' as const})),
              {id: 'LIST', type: 'Todo'},
            ]
          : [{id: 'LIST', type: 'Todo'}],
      query: () => {
        return {
          method: 'GET',
          path: '/todo',
        };
      },
      transformResponse: (res: any[] /*FIXME: types*/) => {
        return res.map((item) =>
          Todo.create({
            description: item.description,
            id: item.id,
            title: item.title,
          })
        );
      },
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      invalidatesTags: (result, error, {id}) => [{id: id, type: 'Todo'}],
      query: ({title, description, id}) => {
        const parameter = JSON.stringify({
          description,
          title: title.toString(),
        });
        return {
          method: 'PUT',
          parameter,
          path: `/todo/${id}`,
        };
      },
      transformResponse: (res: any /*FIXME: types*/) => {
        return Todo.create({
          description: res.description,
          id: res.id,
          title: res.title,
        });
      },
    }),
  }),
});

export const {
  useUpdateTodoMutation,
  useGetTodoQuery,
  useGetTodoListQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
