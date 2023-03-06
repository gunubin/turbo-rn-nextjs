import React from 'react';

import {Toast} from '@/components/ui/Toast';

import {useTransientToast} from './hooks';
import {Props} from './types';

export const TransientToast: React.FC<Props> = ({id}) => {
  const props = useTransientToast({id});
  return React.createElement(Toast, props);
};
