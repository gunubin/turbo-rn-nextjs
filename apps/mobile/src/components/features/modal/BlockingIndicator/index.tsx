import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {BlockingIndicatorPayload} from '@domain/app/model/modal/BlockingIndicatorPayload';
import {indicatorSelectors} from '@domain/app/services/modal/redux/indicatorSlice';

import {BlockingIndicator} from './View';

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
    [indicator],
  );
  return props.isVisible ? <BlockingIndicator {...props} /> : null;
};
