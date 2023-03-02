import {typography} from '@/styles';

import {fontSize} from '@/styles/typography';

export const getStyle = ({
  size,
  align,
  weight,
  color,
}: // letterSpacing,
// lineHeight,
{
  align: typography.TextAlign;
  color: string;
  size: typography.FontSize;
  weight: typography.FontWeight;
  // lineHeight?: number;
  // letterSpacing?: number;
}) => {
  const style = {
    text: {
      ...typography.normalFont(size, weight),
      color: color,
      // letterSpacing: letterSpacing
      //   ? defaultLetterSpacing[letterSpacing]
      //   : undefined,
      lineHeight: fontSize[size] * 1.5,
      //   ? fontSize[size] * defaultLineHeight[lineHeight]
      //   : undefined,
      textAlign: align,
    },
  };

  return style;
};
