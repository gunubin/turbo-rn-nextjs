import React from 'react';
import {Text} from 'react-native';

import {typography} from '@/styles';

export type Props = {
  align?: typography.TextAlign;
  color?: string;
  size?: typography.FontSize;
  weight?: typography.FontWeight;
  children: React.ReactNode;
} & Pick<
  React.ComponentProps<typeof Text>,
  'numberOfLines' | 'allowFontScaling' | 'ellipsizeMode'
>;
