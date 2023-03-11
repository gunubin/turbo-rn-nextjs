import React, {useMemo} from 'react';

import {BlockingIndicatorPayload} from '@domain/app/models/modal/BlockingIndicatorPayload';
import {useSelector} from '@domain/app/redux';
import {indicatorSelectors} from '@domain/app/services/modal/redux/indicatorSlice';

import {BlockingIndicator} from '@/components/features/modal/BlockingIndicator/View';

type BlockingIndicatorProps = React.ComponentProps<typeof BlockingIndicator>;

export const toBlockingIndicatorProps = ({
  indicator,
}: {
  indicator?: BlockingIndicatorPayload;
}): BlockingIndicatorProps => {
  return {
    isVisible: !!indicator,
  };
};

export const ConnectedBlockingIndicator = () => {
  const indicator = useSelector(indicatorSelectors.selectLatestIndicator);
  const props = useMemo(
    () => toBlockingIndicatorProps({indicator}),
    [indicator]
  );
  return props.isVisible ? <BlockingIndicator {...props} /> : null;
};
