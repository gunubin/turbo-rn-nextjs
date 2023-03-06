import {StyleSheet} from 'react-native';

import {StyleMap} from '@/styles/types';

import {Type} from './types';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  content: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  labelContainer: {
    alignSelf: 'center',
    flex: 1,
  },
});

const typeStyles: StyleMap<Type, typeof styles> = {
  Error: {
    ...styles,
    container: {
      ...styles.container,
    },
  },
  Success: {
    ...styles,
    container: {
      ...styles.container,
    },
  },
};

export const getStyles = (type: Type) => {
  return typeStyles[type];
};
