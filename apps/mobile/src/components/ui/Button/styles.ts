import {StyleSheet} from 'react-native';

import {ButtonType} from '@/components/ui/Button/types';
import {colors} from '@/styles';

import {getShadowStyle} from '@/styles/shadow';

const primaryStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.brand.green,
    borderRadius: 100,
    paddingBottom: 13,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 13,
    ...getShadowStyle(),
  },
});

const subStyles = StyleSheet.create({
  container: {
    ...primaryStyles.container,
    backgroundColor: colors.neutral.white,
    borderColor: colors.brand.green,
  },
});

const warningStyles = StyleSheet.create({
  container: {
    ...primaryStyles.container,
    backgroundColor: colors.semantic.red,
  },
});

const disabledStyles = StyleSheet.create({
  container: {
    ...primaryStyles.container,
    backgroundColor: colors.semantic.disabled,
  },
});

const stylesMap: Record<ButtonType, StyleSheet.NamedStyles<any>> = {
  primary: primaryStyles,
  sub: subStyles,
  warning: warningStyles,
};

export const getStyles = (type: ButtonType, isDisabled: boolean) => {
  return isDisabled ? disabledStyles : stylesMap[type];
};

export const getTextColor = (type: ButtonType) => {
  return type === 'primary' || type === 'warning'
    ? colors.neutral.white
    : colors.brand.green;
};
