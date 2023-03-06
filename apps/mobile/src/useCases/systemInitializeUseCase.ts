import {createUseCaseFactory} from '@domain/app/lib/useCase/utils';

const sleep = (msec: number) =>
  new Promise(resolve => setTimeout(() => resolve({}), msec));

export const useSystemInitializeUseCase = createUseCaseFactory(
  () => {
    return async () => {
      await sleep(2000);
    };
  },
  {
    id: 'useSystemInitializeUseCase',
  },
);
