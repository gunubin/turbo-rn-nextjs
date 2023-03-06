import {Button} from 'native-base';
import React from 'react';

export type ButtonType = 'primary' | 'sub' | 'warning';
export type Props = React.ComponentProps<typeof Button> & {
  type?: ButtonType;
  isDisabled?: boolean;
  onPress: () => void;
};
