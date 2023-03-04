import {ToastItem} from '@domain/app/models/toast/ToastItem';

export interface IToastManager {
  show(params: ToastItem): void;

  hide(id: string): void;
}
