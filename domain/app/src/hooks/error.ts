import {useLayoutEffect, useMemo} from 'react';

import {ApiError} from '@app/api/ApiError';
import {createErrorManager} from '@app/services/error/ErrorManager';
import {transformNetworkError} from '@app/services/error/errors';
import {networkErrorHandler} from '@app/services/error/handlers';

export const useErrorDisplay = (error: unknown) => {
  const errorManager = useMemo(
    () => createErrorManager(networkErrorHandler),
    [networkErrorHandler, networkErrorHandler]
  );
  useLayoutEffect(() => {
    if (error instanceof ApiError) {
      errorManager.show({
        defaultErrorDisplayType: 'toast',
        error: transformNetworkError(error),
      });
    }
  }, [error, errorManager]);
};
