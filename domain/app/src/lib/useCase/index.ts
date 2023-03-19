import {UseCase} from '@domain/app/lib/useCase/types';
import {createUseCaseState} from '@domain/app/lib/useCase/useCaseState';

type UseCaseFactoryOptions = {
  id: string;
};

/**
 * 既存の関数をラップして状態管理とエラーハンドリングのロジックを追加するusecaseのファクトリ関数を作成します。
 *
 * @param useCaseFactory - 依存関係を受け取ってusecaseを実行する関数を返す関数
 * @param options - UseCaseを識別するためのUseCaseId
 */
export const createUseCaseFactory = <
  TParams = void,
  TDeps = void,
  TResult = void
>(
  useCaseFactory: (deps: TDeps) => UseCase<TParams, TResult>,
  options: UseCaseFactoryOptions
) => {
  const {id} = options;
  const useCaseState = createUseCaseState();
  return (deps: TDeps): UseCase<TParams, TResult> => {
    const useCase = useCaseFactory(deps);
    return async (params: TParams) => {
      try {
        useCaseState.command({id});
        return await useCase(params);
      } catch (error) {
        useCaseState.fail({error, id});
        throw error;
      }
    };
  };
};
