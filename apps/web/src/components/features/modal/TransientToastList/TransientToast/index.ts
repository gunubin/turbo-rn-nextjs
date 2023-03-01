import React from 'react';

import {Toast} from '@web/components/features/modal/Toast';

import {useTransientToast} from './hooks';
import {Props} from './types';

export const TransientToast: React.FC<Props> = ({id}) => {
  const props = useTransientToast({id});
  return Toast(props);
};
