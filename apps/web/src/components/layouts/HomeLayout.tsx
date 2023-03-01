import React from 'react';

import {Header} from '@web/components/layouts/navigation/Header';

type Props = {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<Props> = ({children}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
