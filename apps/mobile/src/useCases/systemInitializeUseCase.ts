import {createUseCaseFactory} from '@domain/app/lib/useCase/utils';

export const useSystemInitializeUseCase = createUseCaseFactory(
  () => {
    return async () => {};
  },
  {
    id: 'useSystemInitializeUseCase',
  },
);
