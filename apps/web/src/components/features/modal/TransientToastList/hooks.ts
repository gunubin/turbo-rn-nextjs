import {useSelector} from 'react-redux';

import {toastSelectors} from '@app/services/toast/redux/toastSlice';

export const useTransientToastList = () => {
  const ids = useSelector(toastSelectors.selectIds) as string[]; // FIXME: as string[]が適切かどうか
  return {ids};
};
