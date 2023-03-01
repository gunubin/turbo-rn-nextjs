import {Todo} from '@todo/domain/todo/Todo';
import React from 'react';



import {BackButton} from '@web/components/layouts/navigation/BackButton';

type Props = {
  item?: Todo;
};

export const TodoDetailHeader: React.FC<Props> = ({item}) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="@web/components/features/navigation/TodoDetailHeader/index#"
        >
          {item?.title}
        </a>
        <BackButton />
      </div>
    </nav>
  );
};
