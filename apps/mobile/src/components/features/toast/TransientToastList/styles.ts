import {StyleSheet} from 'react-native';

export const getStyles = (bottomInset: number) =>
  StyleSheet.create({
    container: {
      bottom: bottomInset,
      position: 'absolute',
      right: 0,
      width: '100%',
    },
  });
