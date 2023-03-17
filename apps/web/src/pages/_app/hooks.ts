import {useEffect} from 'react';

import {useIndicator} from '@domain/app/hooks/indicator';
import {useUseCase} from '@domain/app/lib/useCase/useUseCase';

import {useSystemInitializeUseCase} from '@/useCases/useCases/systemInitializeUseCase';


export const useAppPage = () => {
  const [systemInitialize, {isLoading}] = useUseCase(useSystemInitializeUseCase());

  useIndicator(isLoading, {id: 'useSystemInitializeUseCase'});

  useEffect(() => {
    systemInitialize()
  }, [systemInitialize])
};
