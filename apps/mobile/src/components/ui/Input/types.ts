import {Input} from 'native-base';
import React from 'react';

export type Props = Omit<
  React.ComponentPropsWithoutRef<typeof Input>,
  'onChange'
> & {
  onChange: (value: any) => void;
};
