import {Box, VStack} from 'native-base';
import React from 'react';
import {View} from 'react-native';

import {useSafeAreaBottomInset} from '@/hooks/safeArea';

import {getStyles} from './styles';
import {Props} from './types';

import {TransientToast} from '../TransientToast';

export const TransientToastList: React.FC<Props> = ({ids}) => {
  const bottomInset = useSafeAreaBottomInset();
  const styles = getStyles(bottomInset);
  const list = ids.map(id => {
    return (
      <VStack key={id} space={2}>
        <TransientToast id={id} />
      </VStack>
    );
  });

  return (
    <View style={styles.container}>
      <Box px={2}>{list}</Box>
    </View>
  );
};
