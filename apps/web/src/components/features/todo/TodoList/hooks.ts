import {useCallback} from 'react';

import {useIndicator} from '@domain/app/hooks/indicator';
import {useUseCase} from '@domain/app/lib/useCase/useUseCase';
import {TodoId} from '@domain/todo/models/todo/TodoId';
import {useGetTodoListQuery} from '@domain/todo/services/todo/redux/todoApi';
import {createRemoveTodoUseCase} from '@domain/todo/useCases/todo/removeTodoUseCase';

import {createNavigation} from '@/services/navigation/Navigation';

export const useTodoList = () => {
  const [removeTodo] = useUseCase(createRemoveTodoUseCase());
  const {data: list, isLoading} = useGetTodoListQuery();
  
  useIndicator(isLoading, {id: 'useGetTodoListQuery'})

  const nav = createNavigation();

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
