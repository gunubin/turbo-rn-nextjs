export const getShadowStyle = ({
  color = 'black',
  height = 4,
  opacity = 0.1,
}: {
  color?: string;
  height?: number;
  opacity?: number;
} = {}) => ({
  elevation: height,
  shadowColor: color,
  shadowOffset: {
    height,
    width: 0,
  },
  shadowOpacity: opacity,
  shadowRadius: height,
});
