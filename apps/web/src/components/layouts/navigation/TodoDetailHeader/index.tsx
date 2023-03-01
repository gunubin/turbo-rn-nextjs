import React from 'react';

import {TodoDetailHeader} from '@web/components/layouts/navigation/TodoDetailHeader/View';
import {useTodoDetailHeader} from '@web/components/layouts/navigation/TodoDetailHeader/hooks';

export const ConnectedTodoDetailHeader = () => {
  const props = useTodoDetailHeader();
  return React.createElement(TodoDetailHeader, props);
};
