import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/query';
import {useMemo, useState} from 'react';

import {ApiError} from '@domain/app/api/ApiError';
import {useErrorDisplay} from '@domain/app/hooks/error';
import {useIndicator} from '@domain/app/hooks/indicator';
import {ErrorDisplayType} from '@domain/app/lib/error/types';
import {createUseCaseState} from '@domain/app/lib/useCase/useCaseState';
import {createErrorManager} from '@domain/app/services/error/ErrorManager';
import {
  transformApplicationError,
  transformNetworkError,
} from '@domain/app/services/error/errors';
import {
  applicationErrorHandler,
  networkErrorHandler,
} from '@domain/app/services/error/handlers';

type UseCase<TParams, TResult> = (
  params: TParams
) => Promise<TResult | undefined>;
type UseCaseFactoryResult<TParams, TResult> = [
  UseCase<TParams, TResult>,
  {isLoading: boolean}
];

type UseCaseFactoryOptions = {
  id: string; // TODO: 関数名を自動で取得するようにしないとuseCase名変更時に絶対バグる
  errorDisplayType?: ErrorDisplayType;
};

export const createUseCaseFactory = <
  // 順番悩ましいけど一旦
  TParams = void,
  TDeps = void,
  TResult = void
>(
  useCseFactory: (deps: TDeps) => UseCase<TParams, TResult>,
  options: UseCaseFactoryOptions
) => {
  const {id} = options || {};
  return (deps: TDeps): UseCaseFactoryResult<TParams, TResult> => {
    const [isLoading, setIsLoading] = useState(false);
    const useCaseState = createUseCaseState();
    const useCase = useCseFactory(deps);
    const command = useMemo(
      () => async (params: TParams) => {
        try {
          useCaseState.command({id});
          setIsLoading(true);
          const result = await useCase(params);
          useCaseState.success({id, result});
          return result;
        } catch (error) {
          useCaseState.fail({error, id});
          if (error instanceof ApiError) {
            const errorManager = createErrorManager(networkErrorHandler);
            errorManager.show({
              error: transformNetworkError(error),
              ...(options?.errorDisplayType && {
                defaultErrorDisplayType: options.errorDisplayType,
              }),
            });
          } else {
            const errorManager = createErrorManager(applicationErrorHandler);
            errorManager.show({
              error: transformApplicationError(error as Error),
            });
          }
          return undefined;
        } finally {
          setIsLoading(false);
        }
      },
      [] // eslint-disable-line react-hooks/exhaustive-deps
    );
    return [command, {isLoading}];
  };
};

/*
 * usage: const getUser = createQuery(useGetUserQuery);
 * useErrorDisplayとuseIndicatorのみなので不要かも
 */
export const createQuery = <
  TQuery extends UseQuery<QueryDefinition<any, any, any, any>>
>(
  query: TQuery,
  options?: {
    indicator?: boolean;
  }
) => {
  const {indicator = false} = options || {};
  return (...args: Parameters<typeof query>) => {
    // eslint-disable-next-line prefer-spread
    const ret = query.apply(null, args);
    useErrorDisplay(ret.error);
    useIndicator(indicator && ret.isLoading);
    return ret;
  };
};
