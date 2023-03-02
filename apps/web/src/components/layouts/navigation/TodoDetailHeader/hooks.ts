import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';

import {TodoId} from '@todo/domain/todo/TodoId';
import {todoApi} from '@todo/services/todo/redux/todoApi';

export const useTodoDetailHeader = () => {
  const {
    query: {todoId = ''},
  } = useRouter();
  const id = TodoId.create(todoId as string);
  const {data: item} = useSelector(todoApi.endpoints.getTodo.select(id));
  return {
    item,
  };
};
