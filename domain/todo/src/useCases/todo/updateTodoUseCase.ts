import {createUseCaseFactory} from '@domain/app/lib/useCase';
import {createToastManger} from '@domain/app/services/toast/ToastManager';
import {Todo} from '@domain/todo/models/todo/Todo';
import {useTodoList} from '@domain/todo/services/todo/TodoList';

type Params = {
  item: Todo;
};

export const createUpdateTodoUseCase = createUseCaseFactory<Params>(
  () => {
    const todoList = useTodoList();
    const toast = createToastManger();
    return async function removeTodoUseCase({item}) {
      await todoList.update({item});
      toast.show({message: '保存しました', status: 'Success'});
    };
  },
  {id: 'removeTodoUseCase'}
);
