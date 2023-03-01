import {Todo} from '@todo/domain/todo/Todo';
import {TodoId} from '@todo/domain/todo/TodoId';
import React from 'react';

import {TodoListItem} from '@web/components/features/todo/TodoListItem';

type Props = {
  list?: Todo[];
  onPressItem: (id: TodoId) => void;
  onPressRemove: (id: TodoId) => void;
};

export const TodoList: React.FC<Props> = ({
  list,
  onPressItem,
  onPressRemove,
}) => {
  const items = list?.map((item) => {
    return (
      <TodoListItem
        key={item.id}
        title={item.title}
        onPressItem={() => onPressItem(item.id)}
        onPressRemove={() => onPressRemove(item.id) /*useCallback*/}
      />
    );
  });
  return <div className="list-group">{items}</div>;
};
