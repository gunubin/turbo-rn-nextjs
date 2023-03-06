import {TextStyle, ViewStyle} from 'react-native';

/**
 * 特定のunionに対応したstyleのパターン定義
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type StyleMap<S extends string, T extends {}> = Record<
  S,
  Record<keyof T, ViewStyle | TextStyle>
>;
