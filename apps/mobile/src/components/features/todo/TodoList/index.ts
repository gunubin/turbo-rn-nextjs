import React from 'react';

import {TodoList} from '@/components/features/todo/TodoList/View';
import {useToastList} from '@/components/features/todo/TodoList/hooks';

export const ConnectedTodoList = () => {
  const props = useToastList();
  return React.createElement(TodoList, props);
};
