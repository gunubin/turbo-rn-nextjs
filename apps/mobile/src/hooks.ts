import {useLayoutEffect} from 'react';

import {useUseCase} from '@domain/app/lib/useCase/useUseCase';

import {useIndicator} from '@/hooks/indicator';
import {useSystemInitializeUseCase} from '@/useCases/systemInitializeUseCase';

export const useRootPage = () => {
  const [systemInit, {isLoading}] = useUseCase(useSystemInitializeUseCase());
  useIndicator(isLoading);

  useLayoutEffect(() => {
    systemInit();
  }, [systemInit]);

  return {
    isInitializing: isLoading,
  };
};
