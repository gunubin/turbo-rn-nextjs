import {ITodoListService} from '@domain/todo/models/todo/types';
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@domain/todo/services/todo/redux/todoApi';

export const useTodoList = (): ITodoListService => {
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  return {
    add: async ({item}) => {
      return await createTodo(item).unwrap();
    },
    remove: async ({id}) => {
      return await deleteTodo(id).unwrap();
    },
    update: async ({item}) => {
      return await updateTodo(item).unwrap();
    },
  };
};
