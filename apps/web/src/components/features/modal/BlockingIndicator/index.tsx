import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {BlockingIndicatorPayload} from '@app/services/modal/BlockingIndicatorPayload';
import {indicatorSelectors} from '@app/services/modal/redux/indicatorSlice';

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
