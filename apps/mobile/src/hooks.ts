import {useLayoutEffect} from 'react';

import {useIndicator} from '@/hooks/indicator';
import {useSystemInitializeUseCase} from '@/useCases/systemInitializeUseCase';

export const useRootPage = () => {
  const [systemInit, {isLoading}] = useSystemInitializeUseCase();
  useIndicator(isLoading);

  useLayoutEffect(() => {
    systemInit();
  }, [systemInit]);

  return {
    isInitializing: isLoading,
  };
};
