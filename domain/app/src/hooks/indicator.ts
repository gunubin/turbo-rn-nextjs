import {useEffect, useMemo} from 'react';

import {createBlockingIndicator} from '@domain/app/services/modal/BlockingIndicator';

type Options = {
  id?: string;
};

export const useIndicator = (isLoading: boolean, options?: Options) => {
  const blockingIndicator = useMemo(() => createBlockingIndicator(), []);
  const {id} = options || {};
  useEffect(() => {
    if (isLoading) {
      blockingIndicator.show({
        id,
      });
    } else {
      blockingIndicator.hide({id});
    }
    // return () => blockingIndicator.clear();
  }, [blockingIndicator, isLoading, id]);
};
