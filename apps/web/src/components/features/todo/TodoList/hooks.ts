
import {useCallback} from 'react';

import {createQuery} from '@app/lib/useCase/utils';
import {useNavigation} from '@app/services/navigation/Navigation';
import {TodoId} from '@todo/domain/todo/TodoId';
import {useGetTodoListQuery} from '@todo/services/todo/redux/todoApi';
import {useRemoveTodoUseCase} from '@todo/useCases/todo/removeTodoUseCase';



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
