import {Fields} from 'form';
import React from 'react';

import {FormValues} from '@domain/todo/forms/addTodo';

type Props = {
  fields: Fields<FormValues>;
  onPressButton: () => void;
};

export const TodoInputForm: React.FC<Props> = ({fields, onPressButton}) => {
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
        <input type="text" className="form-control" {...fields.title} />
      </div>
      <div className="">{fields.title.error?.message}</div>
    </>
  );
};
