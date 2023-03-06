import {useCallback} from 'react';

import {TodoId} from '@domain/todo/models/todo/TodoId';
import {useGetTodoListQuery} from '@domain/todo/services/todo/redux/todoApi';
import {useRemoveTodoUseCase} from '@domain/todo/useCases/todo/removeTodoUseCase';

export const useToastList = () => {
  const {data: list} = useGetTodoListQuery();
  const [removeTodo] = useRemoveTodoUseCase();
  const onPressDelete = useCallback(
    (id: TodoId) => {
      removeTodo({id});
    },
    [removeTodo],
  );
  return {
    list,
    onPressDelete,
  };
};
