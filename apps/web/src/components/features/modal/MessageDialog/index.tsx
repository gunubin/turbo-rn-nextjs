import React from 'react';
import {useSelector} from 'react-redux';

import {createMessageDialog} from '@app/services/modal/MessageDialog';
import {MessageDialogPayload} from '@app/services/modal/MessageDialogPayload';
import {modalSelectors} from '@app/services/modal/redux/modalSlice';

import {Dialog} from '@/components/features/modal/Dialog';
import {MessageDialog} from '@/components/features/modal/MessageDialog/View';
import {Button} from '@/components/ui/Button';
type ButtonType = React.ComponentProps<typeof Button>['type'];

type DialogProps = React.ComponentProps<typeof Dialog>;
type MessageDialogProps = React.ComponentProps<typeof MessageDialog>;

const getLabelType = (
  labels: MessageDialogPayload['labels'],
  actionIndex: number
): ButtonType => {
  if (labels.length === 1) {
    return 'primary';
  } else {
    return actionIndex === 0 ? 'secondary' : 'primary';
  }
};

export const toMessageDialogProps = ({
  id,
  labels,
  message,
  title,
  dialogType,
}: MessageDialogPayload): MessageDialogProps => {
  const {hide} = createMessageDialog();
  const actions = labels.map((label, index, list) => {
    return {
      children: label,
      onPress: () => {
        hide({id, label});
      },
      type: getLabelType(list as MessageDialogPayload['labels'], index),
    };
  });
  return {
    actions: actions as DialogProps['actions'],
    isVisible: true,
    message,
    title,
    type: dialogType || 'normal',
  };
};

export const ConnectedModal = () => {
  const modal = useSelector(modalSelectors.selectLatestModal);
  if (!modal) return null;
  switch (modal.type) {
    case 'messageDialog':
      return MessageDialog(toMessageDialogProps(modal));
    default:
      return null;
  }
};
