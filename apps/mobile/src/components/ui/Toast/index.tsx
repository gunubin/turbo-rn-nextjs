import {Alert, Center, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useMemo} from 'react';
import {Animated} from 'react-native';

import {getStyles} from './styles';
import {Props} from './types';

const FADE_DURATION = 350;

export const Toast: React.FC<Props> = props => {
  const {type = 'Success'} = props;
  const styles = useMemo(() => getStyles(type), [type]);
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
      <Center w="100%">
        <Alert w="100%" status="info" colorScheme="info">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  {props.children}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      </Center>
    </Animated.View>
  );
};
