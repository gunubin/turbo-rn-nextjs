import colors from '@/styles/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  action: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    backgroundColor: colors.neutral.white,
    borderRadius: 8,
    // maxWidth: 348,
    maxWidth: 600,
    width: '100%',
  },
  window: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
