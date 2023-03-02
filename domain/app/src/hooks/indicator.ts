import {useLayoutEffect, useMemo} from 'react';

import {createBlockingIndicator} from '@app/services/modal/BlockingIndicator';

type Options = {
  indicatorId?: string;
};

// TODO: 場所
export const useIndicator = (isLoading: boolean, options?: Options) => {
  const blockingIndicator = useMemo(() => createBlockingIndicator(), []);
  const {indicatorId: id} = options || {};
  useLayoutEffect(() => {
    if (isLoading) {
      blockingIndicator.show({
        id,
      });
    } else {
      blockingIndicator.hide({id});
    }
    return () => blockingIndicator.clear();
  }, [blockingIndicator, isLoading, id]);
};
