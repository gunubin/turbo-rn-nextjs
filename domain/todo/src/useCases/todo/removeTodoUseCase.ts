import {createUseCaseFactory} from '@domain/app/lib/useCase';
import {ReduxProvider} from '@domain/app/services/redux/ReduxProvider';
import {createToastManger} from '@domain/app/services/toast/ToastManager';
import {TodoId} from '@domain/todo/models/todo/TodoId';
import {useTodoList} from '@domain/todo/services/todo/TodoList';
import {todoApi} from '@domain/todo/services/todo/redux/todoApi';

type Params = {
  id: TodoId;
};

export const useRemoveTodoUseCase = createUseCaseFactory<Params>(
  () => {
    const todoList = useTodoList();
    const toast = createToastManger();
    const redux = ReduxProvider.create();
    return async function removeTodoUseCase({id}) {
      const {data: todos} = todoApi.endpoints.getTodoList.select()(
        redux.getState()
      );
      const todo = todos?.find((t) => t.id === id);
      await todoList.remove({id});
      await toast.show({
        message: `${todo?.title}を削除しました`,
      });
    };
  },
  {id: 'removeTodoUseCase'}
);
