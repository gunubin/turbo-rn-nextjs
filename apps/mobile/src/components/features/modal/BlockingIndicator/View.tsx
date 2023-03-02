import React, {useMemo} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {colors} from '@/styles';

import {getBackdropStyles, styles} from './styles';
import {Props} from './types';

// TODO: animation
export const BlockingIndicator: React.FC<Props> = ({headerHeight}) => {
  const backdropStyles = useMemo(
    () => getBackdropStyles(headerHeight || 0),
    [headerHeight],
  );
  return (
    <View style={backdropStyles.backdrop}>
      <View style={styles.background}>
        <ActivityIndicator animating color={colors.semantic.blue} />
      </View>
    </View>
  );
};
