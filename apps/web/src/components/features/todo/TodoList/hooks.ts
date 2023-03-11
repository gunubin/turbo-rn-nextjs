import {useCallback} from 'react';

import {createQuery} from '@domain/app/lib/useCase/utils';
import {useNavigation} from '@domain/app/services/navigation/Navigation';
import {TodoId} from '@domain/todo/models/todo/TodoId';
import {useGetTodoListQuery} from '@domain/todo/services/todo/redux/todoApi';
import {useRemoveTodoUseCase} from '@domain/todo/useCases/todo/removeTodoUseCase';


export const useTodoList = () => {
  const [removeTodo] = useRemoveTodoUseCase();
  const {data: list} = createQuery(useGetTodoListQuery, {indicator: true})();

  const nav = useNavigation();

  const onPressItem = useCallback(
    (id: TodoId) => {
      nav.navigate('/todo/[todoId]', {todoId: id});
    },
    [nav]
  );
  const onPressRemove = useCallback(
    (id: TodoId) => {
      removeTodo({id});
    },
    [removeTodo]
  );
  return {list, onPressItem, onPressRemove};
};
