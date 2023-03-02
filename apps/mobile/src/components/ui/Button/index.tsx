import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';

import {Text} from '@/components/ui/Text';

import {getStyles, getTextColor} from './styles';
import {Props} from './types';

export const Button: React.FC<Props> = props => {
  const {isDisabled = false, type = 'primary'} = props;
  const styles = useMemo(() => getStyles(type, isDisabled), [isDisabled, type]);
  const textColor = useMemo(() => getTextColor(type), [type]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      disabled={props.isDisabled}>
      <Text align="center" size="l" weight="bold" color={textColor}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
