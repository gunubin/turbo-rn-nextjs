import {Box, Heading, HStack, Spinner} from 'native-base';
import React from 'react';
import {View} from 'react-native';

import {backdropStyles} from './styles';
import {Props} from './types';

// TODO: animation
export const BlockingIndicator: React.FC<Props> = () => {
  return (
    <View style={backdropStyles.backdrop}>
      <Box rounded={10} bgColor="white" px="5" py="3">
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Box>
    </View>
  );
};
