import React from 'react';

type Props = {
  title: string;
  onPressItem: () => void;
  onPressRemove: () => void;
};

export const TodoListItem: React.FC<Props> = ({
  onPressItem,
  onPressRemove,
  title,
}) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col">
          <div onClick={onPressItem}>{title}</div>
        </div>
        <div onClick={onPressRemove} className="col">
          削除
        </div>
      </div>
    </div>
  );
};
