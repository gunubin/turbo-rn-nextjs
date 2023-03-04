import {ModalId} from '@domain/app/models/modal/ModalId';
import {BaseModalPayload} from '@domain/app/services/modal/types';

export type DialogLabels<TLabel = string> =
  | readonly [TLabel, TLabel]
  | readonly [TLabel];

export type MessageDialogType = 'normal' | 'success';
export type MessageDialogPayload<TLabel = string> = BaseModalPayload & {
  dialogType?: MessageDialogType;
  type: 'messageDialog';
  labels: DialogLabels<TLabel>;
  message?: string;
  title: string;
} & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const MessageDialogPayload = {
  create: <TLabel>(args: {
    title: string;
    message?: string;
    labels: DialogLabels<TLabel>;
    dialogType?: MessageDialogType;
  }): MessageDialogPayload<TLabel> => {
    const id = ModalId.create(new Date().getTime().toString());
    return {
      dialogType: args.dialogType,
      id,
      labels: args.labels,
      message: args.message,
      title: args.title,
      type: 'messageDialog',
    } as MessageDialogPayload<TLabel>;
  },
};
