import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/query';
import {useMemo, useState} from 'react';
import {failure, Result, success} from 'utils/result';

import {ApiError} from '@domain/app/api/ApiError';
import {useErrorDisplay} from '@domain/app/hooks/error';
import {useIndicator} from '@domain/app/hooks/indicator';
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
import {ErrorDisplayType} from '@domain/app/services/error/types';

type UseCase<TParams, TResult> = (params: TParams) => Promise<TResult>;
type UseCaseFactoryResult<TParams, TResult> = [
  UseCase<TParams, Result<TResult, any>>,
  {isLoading: boolean}
];

type UseCaseFactoryOptions = {
  id: string; // TODO: 関数名を自動で取得するようにしないとuseCase名変更時に絶対バグる
  errorDisplayType?: ErrorDisplayType;
};

/**
 * 既存の関数をラップして状態管理とエラーハンドリングのロジックを追加するusecaseのファクトリ関数を作成します。
 *
 * @param useCseFactory - 依存関係を受け取ってusecaseを実行する関数を返す関数
 * @param options - ID文字列とオプションのエラー表示タイプを含むオブジェクト
 * @returns {UseCaseFactoryResult} - usecase関数とローディングステートを持つオブジェクトを含むタプル
 */
export const createUseCaseFactory = <
  // 順番悩ましいけど一旦
  TParams = void,
  TDeps = void,
  TResult = void
>(
  useCseFactory: (deps: TDeps) => UseCase<TParams, TResult>,
  options: UseCaseFactoryOptions
) => {
  const {id, errorDisplayType} = options || {};
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
          return success(result);
        } catch (error) {
          useCaseState.fail({error, id});
          if (error instanceof ApiError) {
            const errorManager = createErrorManager(networkErrorHandler);
            errorManager.show({
              error: transformNetworkError(error),
              ...(errorDisplayType && {
                defaultErrorDisplayType: errorDisplayType,
              }),
            });
          } else {
            const errorManager = createErrorManager(applicationErrorHandler);
            errorManager.show({
              error: transformApplicationError(error as Error),
            });
          }
          return failure(error);
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
