import {useCallback} from 'react';

import {TodoId} from '@domain/todo/models/todo/TodoId';
import {useGetTodoListQuery} from '@domain/todo/services/todo/redux/todoApi';
import {useRemoveTodoUseCase} from '@domain/todo/useCases/todo/removeTodoUseCase';

import {RootParamList} from '@/navigation/routes';
import {createNavigation} from '@/services/navigation/Navigation';

export const useToastList = () => {
  const nav = createNavigation<RootParamList>();
  const {data: list} = useGetTodoListQuery();
  const [removeTodo] = useRemoveTodoUseCase();
  const onPressDelete = useCallback(
    (id: TodoId) => {
      removeTodo({id});
    },
    [removeTodo],
  );

  const onPressItem = useCallback(
    (id: TodoId) => {
      nav.navigate('detailPage', {id});
    },
    [nav],
  );
  return {
    list,
    onPressDelete,
    onPressItem,
  };
};
