import {useTodoList} from '@todo/services/todo/TodoList';

import {createUseCaseFactory} from '@app/lib/useCase/utils';

import {Todo} from '@todo/domain/todo/Todo';

type Params = {
  item: Todo;
};

export const useAddTodoUseCase = createUseCaseFactory<Params>(() => {
  const todoList = useTodoList();
  return async function addTodoUseCase({item}) {
    await todoList.add({item});
  };
}, {id: 'addTodoUseCase'});
