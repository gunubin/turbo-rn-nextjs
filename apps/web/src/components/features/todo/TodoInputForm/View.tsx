import {Fields} from 'form';
import React from 'react';


import {FormValues} from '@domain/todo/forms/addTodo';

import {Input} from '@/components/ui/Input';

type Props = {
  fields: Fields<FormValues>;
  onPressButton: () => void;
};

export const TodoInputForm: React.FC<Props> = ({fields, onPressButton, ...rest}) => {
  return (
    <>
      <div className="input-group mb-3">
        <button
          onClick={onPressButton}
          className="btn btn-outline-secondary"
          type="button"
        >
          Todo追加
        </button>
        <Input
          type="text"
          className="form-control"
          {...fields.title}
        />
      </div>
      {fields.title?.error && (
        <div className="">{fields.title?.error?.message}</div>
      )}
    </>
  );
};
