
import {createUseCaseFactory} from '@app/lib/useCase/utils';
import {Todo} from '@todo/domain/todo/Todo';
import {useTodoList} from '@todo/services/todo/TodoList';

type Params = {
  item: Todo;
};

export const useUpdateTodoUseCase = createUseCaseFactory<Params>(
  () => {
    const todoList = useTodoList();
    return async function removeTodoUseCase({item}) {
      await todoList.update({item});
    };
  },
  {id: 'removeTodoUseCase'}
);
