import {createUseCaseFactory} from '@domain/app/lib/useCase/utils';
import {createToastManger} from '@domain/app/services/toast/ToastManager';
import {Todo} from '@domain/todo/models/todo/Todo';
import {useTodoList} from '@domain/todo/services/todo/TodoList';

type Params = {
  item: Todo;
};

export const useAddTodoUseCase = createUseCaseFactory<Params>(
  () => {
    const todoList = useTodoList();
    const toast = createToastManger();
    return async function addTodoUseCase({item}) {
      await todoList.add({item});
      toast.show({message: 'Taskを追加しました'})
    };
  },
  {id: 'addTodoUseCase'}
);
