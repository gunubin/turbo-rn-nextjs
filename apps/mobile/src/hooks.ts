import {useLayoutEffect} from 'react';

import {useSystemInitializeUseCase} from '@/useCases/systemInitializeUseCase';

export const useRootPage = () => {
  const [systemInit] = useSystemInitializeUseCase();
  useLayoutEffect(() => {
    systemInit();
  }, [systemInit]);
  return {};
};
