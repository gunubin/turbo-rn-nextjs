import {ApiError} from '@domain/app/api/ApiError';
import {createErrorDisplay} from '@domain/app/services/error/ErrorDisplay';
import {
  transformApplicationError,
  transformNetworkError,
} from '@domain/app/services/error/errors';
import {
  applicationErrorHandler,
  networkErrorHandler,
} from '@domain/app/services/error/handlers';
import {IErrorDisplayManager} from '@domain/app/services/error/types';

export const createErrorDisplayManager = <TError>(): IErrorDisplayManager<TError> => {
  return {
    show: async ({error, defaultErrorDisplayType = 'dialog'}) => {
      if (error instanceof ApiError) {
        const errorDisplay = createErrorDisplay(networkErrorHandler);
        errorDisplay.show({
          error: transformNetworkError(error),
          ...(defaultErrorDisplayType && {
            defaultErrorDisplayType,
          }),
        });
      } else {
        const errorDisplay = createErrorDisplay(applicationErrorHandler);
        errorDisplay.show({
          error: transformApplicationError(error as Error),
        });
      }
    },
  };
};
