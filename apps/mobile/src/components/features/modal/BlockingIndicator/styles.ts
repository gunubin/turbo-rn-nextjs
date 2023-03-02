import colors from '@/styles/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: 8,
    elevation: 1,
    height: 50,
    justifyContent: 'center',
    shadowColor: colors.neutral.platinum,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.0,
    width: 50,
  },
});

export const getBackdropStyles = (top: number) =>
  StyleSheet.create({
    backdrop: {
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      bottom: 0,
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top,
    },
  });
