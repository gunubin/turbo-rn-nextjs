import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {useTimeout} from '@domain/app/hooks/timer';
import {createToastManger} from '@domain/app/services/toast/ToastManager';
import {toastSelectors} from '@domain/app/services/toast/redux/toastSlice';

import {Type} from '@/components/features/modal/Toast/types';
import {RootState} from '@/services/redux/rootReducer';

export type Props = {
  id: string;
};

const DISPLAY_DURATION = 5000;

export const useTransientToast = (params: {id: string}) => {
  const toast = useSelector((state: RootState) =>
    toastSelectors.selectById(state, params.id)
  );

  const timeoutHandler = useCallback(() => {
    const toastManager = createToastManger();
    toastManager.hide(params.id);
  }, [params.id]);

  const onRequestClose = useCallback(() => {
    const toastManager = createToastManger();
    toastManager.hide(params.id);
  }, [params.id]);

  useTimeout(timeoutHandler, DISPLAY_DURATION);
  return {
    children: toast?.message || '',
    onRequestClose,
    type: toast?.status as Type,
  };
};
