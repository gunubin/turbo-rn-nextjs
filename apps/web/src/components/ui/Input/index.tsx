import {InputProps} from '../../../../../../packages/form';
import React, {InputHTMLAttributes} from 'react';

type Props = {field: InputProps} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = (props) => {
  return <input className="form-control" {...props.field} />;
};
