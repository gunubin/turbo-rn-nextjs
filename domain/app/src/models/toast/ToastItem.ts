export type ToastStatus = 'Success' | 'Error';

export type ToastItem = {
  message: string;
  status?: ToastStatus;
};
