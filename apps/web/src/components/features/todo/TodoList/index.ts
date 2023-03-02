import React from 'react';

import {TodoList} from '@/components/features/todo/TodoList/View';
import {useTodoList} from '@/components/features/todo/TodoList/hooks';

export const ConnectedTodoList = () => {
  const props = useTodoList();
  return React.createElement(TodoList, props);
};
