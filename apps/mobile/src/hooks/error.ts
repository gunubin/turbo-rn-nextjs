import {useLayoutEffect} from 'react';

import {ApiError} from '@domain/app/api/ApiError';
import {createErrorDisplay} from '@domain/app/services/error/ErrorDisplay';
import {transformNetworkError} from '@domain/app/services/error/errors';
import {networkErrorHandler} from '@domain/app/services/error/handlers';

export const useErrorDisplay = (error: unknown) => {
  const errorManager = createErrorDisplay(networkErrorHandler);
  useLayoutEffect(() => {
    if (error instanceof ApiError) {
      errorManager.show({
        defaultErrorDisplayType: 'toast',
        error: transformNetworkError(error),
      });
    }
  }, [error, errorManager]);
};
