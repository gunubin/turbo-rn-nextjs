import {theme} from 'native-base';
import {StyleSheet} from 'react-native';

const {colors} = theme;

export const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 1,
    justifyContent: 'center',
    shadowColor: colors.dark['700'],
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.0,
  },
});

export const backdropStyles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
