import {useCallback} from 'react';

import {useUseCase} from '@domain/app/lib/useCase/useUseCase';
import {TodoId} from '@domain/todo/models/todo/TodoId';
import {useGetTodoListQuery} from '@domain/todo/services/todo/redux/todoApi';
import {createRemoveTodoUseCase} from '@domain/todo/useCases/todo/removeTodoUseCase';

import {RootParamList} from '@/navigation/routes';
import {createNavigation} from '@/services/navigation/Navigation';

export const useToastList = () => {
  const nav = createNavigation<RootParamList>();
  const {data: list} = useGetTodoListQuery();
  const [removeTodo] = useUseCase(createRemoveTodoUseCase());
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
