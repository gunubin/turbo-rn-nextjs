import {DialogLabels} from '@domain/app/models/modal/MessageDialogPayload';
import {ModalId} from '@domain/app/models/modal/ModalId';
import {BaseModalPayload} from '@domain/app/services/modal/types';

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
    const id = ModalId.create(new Date().getTime().toString());
    return {
      id,
      labels: args.labels,
      message: args.message,
      title: args.title,
      type: 'errorDialog',
    } as ErrorDialogPayload<TLabel>;
  },
};
