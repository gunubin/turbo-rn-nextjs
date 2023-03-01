import React, {InputHTMLAttributes} from 'react';

import {InputProps} from '@app/lib/validations/types';


type Props = {field: InputProps} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = (props) => {
  return <input className="form-control" {...props.field} />;
};
