import {v4 as uuid} from 'uuid';

import {ModalId} from '@app/services/modal/ModalId';
import {BaseModalPayload, DialogLabels} from '@app/services/modal/types';

export type ErrorDialogPayload<TLabel = string> = BaseModalPayload & {
  type: 'errorDialog';
  labels: DialogLabels<TLabel>;
  title: string;
  message?: string;
} & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const ErrorDialogPayload = {
  create: <TLabel>(args: {
    title: string;
    labels: DialogLabels<TLabel>;
    message?: string;
  }): ErrorDialogPayload<TLabel> => {
    const id = ModalId.create(uuid());
    return {
      id,
      labels: args.labels,
      message: args.message,
      title: args.title,
      type: 'errorDialog',
    } as ErrorDialogPayload<TLabel>;
  },
};
