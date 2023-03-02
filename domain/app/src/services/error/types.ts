import {BaseError} from '@app/lib/error/types';

type ErrorDialogAction = undefined | (() => void);

export type ErrorDialogPayload = {
  displayType: 'dialog';
  actions?: Record<string, ErrorDialogAction>;
  message?: string;
  title: string;
};

export type ErrorToastPayload = {
  displayType: 'toast';
  message: string;
};

export type ErrorPayload = ErrorDialogPayload | ErrorToastPayload;

export type ErrorDisplayType = ErrorPayload['displayType'];

export type ErrorHandler<E extends BaseError> = (
  error: E
) => ErrorPayload | [ErrorDialogPayload, ErrorToastPayload] | undefined;

export interface IErrorManager<T extends BaseError> {
  show(params: {
    error: T;
    defaultErrorDisplayType?: ErrorDisplayType;
  }): Promise<void>;
}
