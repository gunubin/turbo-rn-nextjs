import {ErrorDialogPayload} from '@app/services/modal/ErrorDialogPayload';
import {
  MessageDialogPayload,
  MessageDialogType,
} from '@app/services/modal/MessageDialogPayload';
import {ModalId} from '@app/services/modal/ModalId';

export type BaseModalPayload = {
  id: ModalId;
};

export type DialogLabels<TLabel = string> =
  | readonly [TLabel, TLabel]
  | readonly [TLabel];

// TODO: ErrorDialog
export type ModalPayload = MessageDialogPayload | ErrorDialogPayload;

export interface IMessageDialog {
  show<TLabel extends string>(params: {
    labels: DialogLabels<TLabel>;
    message?: string;
    title: string;
    dialogType?: MessageDialogType;
  }): Promise<TLabel>;

  hide(params: {id: ModalId; label?: string}): void;
}

export interface IBlockingIndicator {
  show(options?: {id?: string; isShowHeaderNavigation?: boolean}): void;

  hide(options?: {id?: string}): void;

  clear(): void;
}
