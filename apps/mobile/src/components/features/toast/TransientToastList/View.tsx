import React from 'react';
import {View} from 'react-native';

import {SpaceInset, SpaceStack} from '@/components/ui/Spacing';
import {useSafeAreaTopInset} from '@/hooks/safeArea';

import {space} from '@/styles/spacing';

import {TransientToast} from '../TransientToast';
import {getStyles} from './styles';
import {Props} from './types';

export const TransientToastList: React.FC<Props> = ({ids}) => {
  const topInset = useSafeAreaTopInset(space.s);
  const styles = getStyles(topInset);
  const list = ids.map((id, index) => {
    const isLast = index === ids.length - 1;
    return (
      <View key={id}>
        <TransientToast id={id} />
        {!isLast && <SpaceStack size="s" />}
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <SpaceInset horizontal="m">{list}</SpaceInset>
    </View>
  );
};
