import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useCallback, useLayoutEffect, useMemo} from 'react';

import {createBlockingIndicator} from '@domain/app/services/modal/BlockingIndicator';

type Options = {
  indicatorId?: string;
  isShowHeaderNavigation?: boolean;
};

// TODO: 場所
export const useIndicator = (isLoading: boolean, options?: Options) => {
  const isFocusedScreen = useIsFocused();
  const blockingIndicator = useMemo(() => createBlockingIndicator(), []);
  const {indicatorId: id, isShowHeaderNavigation} = options || {};
  useLayoutEffect(() => {
    if (isFocusedScreen) {
      if (isLoading) {
        blockingIndicator.show({
          id,
          isShowHeaderNavigation: isShowHeaderNavigation,
        });
      } else {
        blockingIndicator.hide({id});
      }
    }
  }, [
    isFocusedScreen,
    blockingIndicator,
    isLoading,
    id,
    isShowHeaderNavigation,
  ]);
  // screen変更で確実に消す対応
  useFocusEffect(
    useCallback(() => {
      return () => {
        blockingIndicator.clear();
      };
    }, [blockingIndicator]),
  );
};
