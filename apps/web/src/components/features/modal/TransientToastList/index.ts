import React from 'react';

import {TransientToastList} from './View';
import {useTransientToastList} from './hooks';

export const ConnectedTransientToastList: React.FC = () => {
  const props = useTransientToastList();
  return TransientToastList(props);
};
