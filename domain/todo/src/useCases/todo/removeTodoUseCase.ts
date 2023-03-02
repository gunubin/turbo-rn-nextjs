
import {createUseCaseFactory} from '@app/lib/useCase/utils';
import {createMessageDialog} from '@app/services/modal/MessageDialog';
import {ReduxProvider} from '@app/services/redux/ReduxProvider';
import {TodoId} from '@todo/domain/todo/TodoId';
import {useTodoList} from '@todo/services/todo/TodoList';
import {todoApi} from '@todo/services/todo/redux/todoApi';



type Params = {
  id: TodoId;
};

export const useRemoveTodoUseCase = createUseCaseFactory<Params>(() => {
  const todoList = useTodoList();
  const dialog = createMessageDialog();
  const redux = ReduxProvider.create();
  return async function removeTodoUseCase({id}) {
    const {data: todos} = todoApi.endpoints.getTodoList.select()(
      redux.getState()
    );
    const todo = todos?.find((t) => t.id === id);
    const ret = await dialog.show({
      labels: ['キャンセル', '削除'],
      message: `${todo?.title}を削除してもよろしいですか？`,
      title: 'TODO削除',
    });
    if (ret === '削除') {
      await todoList.remove({id});
    }
  };
}, {id: 'removeTodoUseCase'});
