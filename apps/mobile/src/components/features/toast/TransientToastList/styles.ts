import {StyleSheet} from 'react-native';

export const getStyles = (topInset: number) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      right: 0,
      top: topInset,
      width: '100%',
    },
  });
