import {TextStyle} from 'react-native';

import colors from '@/styles/colors';
export type FontSize = keyof typeof fontSize;
export type FontWeight = (typeof fontWeight)[number];
export type TextAlign = (typeof textAlign)[number];

export function fontFamily(weight: FontWeight): TextStyle {
  return {
    // fontFamily: weight === 'normal' ? 'NotoSansJP-Regular' : 'NotoSansJP-Bold',
    fontFamily: 'arial',
  };
}

/**
 * 通常の文字に適用するテキストスタイルのセット
 */
export function normalFont(
  size: FontSize,
  weight: FontWeight = 'normal',
): TextStyle {
  return {
    ...fontFamily(weight),
    color: colors.neutral.blackGreen,
    fontSize: fontSize[size],
    lineHeight: fontSize[size] * 1.5,
  };
}

/* eslint-disable sort-keys */
export const fontSize = {
  xxl: 18,
  xl: 16,
  l: 15,
  m: 14,
  s: 13,
  xs: 12,
  xxs: 10,
};
/* eslint-enable sort-keys */

export const fontWeight = ['normal', 'bold'] as const;

export const textAlign = ['left', 'center', 'right'] as const;
