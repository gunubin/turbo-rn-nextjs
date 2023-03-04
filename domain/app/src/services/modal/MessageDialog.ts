import {
  DialogLabels,
  MessageDialogPayload,
  MessageDialogType,
} from '@domain/app/models/modal/MessageDialogPayload';
import {actions} from '@domain/app/services/modal/redux/modalSlice';
import {IMessageDialog} from '@domain/app/services/modal/types';
import {ReduxProvider} from '@domain/app/services/redux/ReduxProvider';

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
