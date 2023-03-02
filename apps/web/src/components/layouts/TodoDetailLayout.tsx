import React from 'react';

import {ConnectedTodoDetailHeader} from '@/components/layouts/navigation/TodoDetailHeader';

type Props = {
  children: React.ReactNode;
};

export const TodoDetailLayout: React.FC<Props> = ({children}) => {
  return (
    <>
      <ConnectedTodoDetailHeader />
      <main>{children}</main>
    </>
  );
};
