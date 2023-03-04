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
      return createTodo(item).unwrap();
    },
    remove: async ({id}) => {
      return deleteTodo(id).unwrap();
    },
    update: ({item}) => {
      return updateTodo(item).unwrap();
    },
  };
};
