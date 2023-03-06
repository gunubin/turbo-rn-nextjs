import {Input as BaseInput} from 'native-base';
import React, {RefCallback} from 'react';

import {Props} from './types';

export const Input: React.FC<Props> = React.forwardRef(
  ({onChange, ...textProps}, ref: React.Ref<any>) => {
    return (
      <BaseInput
        onChangeText={onChange}
        ref={ref as RefCallback<any>}
        {...textProps}
      />
    );
  },
);
