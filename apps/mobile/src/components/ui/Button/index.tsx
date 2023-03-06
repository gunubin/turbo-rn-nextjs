import {Button as BaseButton} from 'native-base';
import React from 'react';

import {ButtonType, Props} from './types';

const buttonStyles: Record<
  ButtonType,
  Pick<Props, 'colorScheme' | 'variant'>
> = {
  primary: {
    colorScheme: 'secondary',
  },
  sub: {
    colorScheme: 'primary',
    variant: 'outline',
  },
  warning: {
    colorScheme: 'warning',
    variant: 'outline',
  },
};

export const Button: React.FC<Props> = props => {
  const {type = 'primary'} = props;
  const args = buttonStyles[type];

  return (
    <BaseButton onPress={props.onPress} {...args}>
      {props.children}
    </BaseButton>
  );
};
