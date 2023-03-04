import {createUseCaseFactory} from '@domain/app/lib/useCase/utils';
import {Todo} from '@domain/todo/models/todo/Todo';
import {useTodoList} from '@domain/todo/services/todo/TodoList';

type Params = {
  item: Todo;
};

export const useAddTodoUseCase = createUseCaseFactory<Params>(
  () => {
    const todoList = useTodoList();
    return async function addTodoUseCase({item}) {
      await todoList.add({item});
    };
  },
  {id: 'addTodoUseCase'}
);
