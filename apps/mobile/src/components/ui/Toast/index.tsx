import React, {useEffect, useMemo} from 'react';
import {Animated, View} from 'react-native';

import {SpaceInset, SpaceQueue} from '@/components/ui/Spacing';
import {Text} from '@/components/ui/Text';
import {colors} from '@/styles';

import {getStyles} from './styles';
import {Props} from './types';

const FADE_DURATION = 350;

export const Toast: React.FC<Props> = props => {
  const {type = 'Success'} = props;
  const styles = useMemo(() => getStyles(type), [type]);
  const textColor = useMemo(
    () => (type === 'Error' ? colors.semantic.red : '#fff'),
    [type],
  );

  const opacity = useMemo(() => new Animated.Value(0), []);
  const translateY = useMemo(() => new Animated.Value(-4), []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        duration: FADE_DURATION,
        toValue: 1,
        useNativeDriver: true,
      } as Animated.TimingAnimationConfig),
      Animated.timing(translateY, {
        duration: FADE_DURATION,
        toValue: 0,
        useNativeDriver: true,
      } as Animated.TimingAnimationConfig),
    ]).start();
  }, [opacity, translateY]);
  return (
    <Animated.View
      style={{...styles.container, opacity, transform: [{translateY}]}}>
      <SpaceInset vertical="xs" left="s" right="m">
        <View style={styles.content}>
          <SpaceQueue size="xs" />
          <View style={styles.labelContainer}>
            <Text size="l" weight="bold" color={textColor}>
              {props.children}
            </Text>
          </View>
        </View>
      </SpaceInset>
    </Animated.View>
  );
};
