import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';

import {SpaceInset, SpaceQueue, SpaceStack} from '@/components/ui/Spacing';
import {Button} from '@/components/ui/Button';

import {styles} from './styles';
import {Props} from './types';

export const Dialog: React.FC<Props> = ({
  isVisible,
  children,
  onRequestClose,
  actions,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      supportedOrientations={['portrait']}
    >
      <SpaceInset vertical="l" horizontal="s" flex={1}>
        <TouchableOpacity
          activeOpacity={1.0}
          style={styles.backdrop}
          onPress={onRequestClose}
        />
        <View style={styles.window} pointerEvents="box-none">
          <View style={styles.modal}>
            <SpaceStack size="m" />
            {children}
            {actions && (
              <>
                <SpaceStack size="xxl" />
                <SpaceInset horizontal="m">
                  <View style={styles.actions}>
                    {actions.map((action, i) => (
                      <React.Fragment key={i}>
                        <View style={styles.action}>
                          <Button {...action} />
                        </View>
                        {i < actions.length - 1 ? (
                          <SpaceQueue size="m" />
                        ) : null}
                      </React.Fragment>
                    ))}
                  </View>
                </SpaceInset>
              </>
            )}
            <SpaceStack size="xl" />
          </View>
        </View>
      </SpaceInset>
    </Modal>
  );
};
