import {
  MessageDialogPayload,
  MessageDialogType,
} from '@app/services/modal/MessageDialogPayload';
import {actions} from '@app/services/modal/redux/modalSlice';
import {IMessageDialog, DialogLabels} from '@app/services/modal/types';
import {ReduxProvider} from '@app/services/redux/ReduxProvider';

/**
 * Modal that overlay screen
 */
export const createMessageDialog = (): IMessageDialog => {
  const redux = ReduxProvider.create();
  return {
    hide: async ({id, label}) => {
      return redux.dispatch(actions.hid({id, label}));
    },
    show: async <TLabel extends string>(params: {
      labels: DialogLabels<TLabel>;
      message?: string;
      title: string;
      dialogType?: MessageDialogType;
    }) => {
      const dialog = MessageDialogPayload.create<TLabel>(params);
      return redux.dispatch(actions.showed(dialog));
    },
  };
};
