export type ToastStatus = 'Success' | 'Error';

export type Toast = {
  message: string;
  status?: ToastStatus;
};

export interface IToastManager {
  show(params: Toast): void;

  hide(id: string): void;
}
