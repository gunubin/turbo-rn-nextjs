import {createUseCaseFactory} from '@domain/app/lib/useCase';

const sleep = (msec: number) =>
  new Promise(resolve => setTimeout(() => resolve({}), msec));

export const useSystemInitializeUseCase = createUseCaseFactory(
  () => {
    return async () => {
      await sleep(1000);
    };
  },
  {
    id: 'useSystemInitializeUseCase',
  },
);
