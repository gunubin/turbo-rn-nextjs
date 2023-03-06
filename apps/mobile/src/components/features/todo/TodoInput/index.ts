import React from 'react';

import {TodoInput} from '@/components/features/todo/TodoInput/View';
import {useTodoInput} from '@/components/features/todo/TodoInput/hooks';

export const ConnectedTodoInput = () => {
  const props = useTodoInput();
  return React.createElement(TodoInput, props);
};
