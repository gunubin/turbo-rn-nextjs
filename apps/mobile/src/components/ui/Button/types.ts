export type ButtonType = 'primary' | 'sub' | 'warning';
export type Props = {
  type?: ButtonType;
  isDisabled?: boolean;
  onPress: () => void;
};
