import {useCallback, useState} from 'react';
import {failure, Result, success} from 'utils/result';

import {UseCase} from '@domain/app/lib/useCase/types';
import {createErrorDisplayManager} from '@domain/app/services/error/ErrorDisplayManager';
import {ErrorDisplayType} from '@domain/app/services/error/types';

export function useUseCase<TParams = void, TResult = void>(
  command: UseCase<TParams, TResult>,
  options?: {
    errorDisplayType?: ErrorDisplayType;
  }
): [UseCase<TParams, Result<TResult, Error>>, {isLoading: boolean}] {
  const [isLoading, setIsLoading] = useState(false);
  const {errorDisplayType} = options || {};

  const execute = useCallback(
    async (params: TParams) => {
      setIsLoading(true);
      try {
        const result = await command(params);
        return success(result);
      } catch (error) {
        const errorDisplayManager = createErrorDisplayManager();
        errorDisplayManager.show({
          defaultErrorDisplayType: errorDisplayType,
          error,
        });
        return failure(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [command, errorDisplayType]
  );

  return [execute, {isLoading}];
}
