import {createUseCaseFactory} from '@app/lib/useCase/utils';
import {createToastManger} from '@app/services/toast/ToastManager';
import {Todo} from '@todo/domain/todo/Todo';
import {useTodoList} from '@todo/services/todo/TodoList';

type Params = {
  item: Todo;
};

export const useUpdateTodoUseCase = createUseCaseFactory<Params>(
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
