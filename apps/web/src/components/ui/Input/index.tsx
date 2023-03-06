import {InputProps} from 'form';
import React, {ComponentPropsWithRef} from 'react';

type Props = ComponentPropsWithRef<'input'> & Omit<InputProps, 'ref'>;

// eslint-disable-next-line react/display-name
export const Input: React.FC<Props> = React.forwardRef((props, ref) => {
  const {value, ...rest} = props;
  return (
    <input className="form-control" {...rest} defaultValue={value} ref={ref} />
  );
});
