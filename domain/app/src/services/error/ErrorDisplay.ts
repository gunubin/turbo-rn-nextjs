import {ApiError} from '@domain/app/api/ApiError';
import {BaseError} from '@domain/app/models/error/BaseError';
import {DialogLabels} from '@domain/app/models/modal/MessageDialogPayload';
import {
  ErrorHandler,
  ErrorPayload,
  IErrorDisplay,
} from '@domain/app/services/error/types';
import {createMessageDialog} from '@domain/app/services/modal/MessageDialog';
import {createToastManger} from '@domain/app/services/toast/ToastManager';

const DEFAULT_ERROR_MESSAGE = 'アプリでエラーが発生しました。';
const getErrorMessage = (error: BaseError, payload: ErrorPayload): string => {
  if (error.original instanceof ApiError) {
    const {base} = error.original;
    const bases = base?.join('\n');
    return bases || payload.message || DEFAULT_ERROR_MESSAGE;
  }
  return payload.message || DEFAULT_ERROR_MESSAGE;
};

// TODO: hanlderはshowのargにする
export const createErrorDisplay = <TError extends BaseError>(
  errorHandler: ErrorHandler<TError>
): IErrorDisplay<TError> => {
  const messageDialog = createMessageDialog();
  const toastManager = createToastManger();
  const defaultAction = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    OK: () => {},
  };
  return {
    show: async ({error, defaultErrorDisplayType = 'dialog'}) => {
      const errorPayloads = errorHandler(error);
      const errorPayload = Array.isArray(errorPayloads)
        ? errorPayloads.find((ep) => ep.displayType === defaultErrorDisplayType)
        : errorPayloads;
      if (errorPayload) {
        const {displayType} = errorPayload;
        const message = getErrorMessage(error, errorPayload);
        if (displayType === 'dialog') {
          const {actions, title} = errorPayload;
          const labels = actions
            ? Object.keys(actions)
            : Object.keys(defaultAction);
          const result = await messageDialog.show({
            labels: labels as any as DialogLabels, // TODO: ちゃんとやる
            message: message,
            title: title,
          });
          result && actions?.[result]?.();
        } else if (displayType === 'toast') {
          toastManager.show({message, status: 'Error'});
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _exhaustiveCheck: never = errorPayload;
        }
      }
    },
  };
};
