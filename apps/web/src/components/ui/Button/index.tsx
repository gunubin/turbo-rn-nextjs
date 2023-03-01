import React from 'react';

type ButtonType = 'primary' | 'secondary';

type Props = {
  type?: ButtonType;
  children: string;
  onPress?: () => void;
};

export const Button: React.FC<Props> = ({
  children,
  onPress,
  type = 'secondary',
}) => {
  return (
    <button className={`btn btn-${type}`} onClick={onPress}>
      {children}
    </button>
  );
};

