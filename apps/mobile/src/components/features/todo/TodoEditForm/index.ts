import React from 'react';

import {TodoEditForm} from './View';
import {useTodoEditForm} from './hooks';

export const ConnectedTodoEditForm = () => {
  const props = useTodoEditForm();
  return React.createElement(TodoEditForm, props);
};
