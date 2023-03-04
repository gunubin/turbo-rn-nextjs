import {
  DialogLabels,
  MessageDialogType,
} from '@domain/app/models/modal/MessageDialogPayload';
import {ModalId} from '@domain/app/models/modal/ModalId';

export type BaseModalPayload = {
  id: ModalId;
};



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
