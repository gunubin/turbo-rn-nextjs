import React from 'react';

import {TodoInputForm} from '@web/components/features/todo/TodoInputForm/View';
import {useTodoInputForm} from '@web/components/features/todo/TodoInputForm/hooks';

export const ConnectedTodoInputForm = () => {
  const props = useTodoInputForm();
  return React.createElement(TodoInputForm, props);
};
