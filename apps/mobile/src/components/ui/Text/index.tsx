import React, {useMemo} from 'react';
import {Text as RNText} from 'react-native';

import {colors} from '@/styles';

import {getStyle} from './styles';
import {Props} from './types';

export const Text: React.FC<Props> = ({
  children,
  color = colors.neutral.blackGreen,
  weight = 'normal',
  align = 'left',
  size = 'xl',
  ...rest
}) => {
  const styles = useMemo(
    () => getStyle({align, color, size, weight}),
    [align, color, size, weight]
  );
  return (
    <RNText style={styles.text} {...rest}>
      {children}
    </RNText>
  );
};
