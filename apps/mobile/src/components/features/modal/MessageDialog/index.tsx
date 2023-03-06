import {AlertDialog} from 'native-base';
import React from 'react';

import {Dialog} from '@/components/features/modal/Dialog';

import {Props} from './types';

export const MessageDialog: React.FC<Props> = ({
  message,
  title,
  ...modalProps
}) => {
  return (
    <Dialog {...modalProps}>
      <AlertDialog.Header>{title}</AlertDialog.Header>
      <AlertDialog.Body>{message}</AlertDialog.Body>
    </Dialog>
  );
};
