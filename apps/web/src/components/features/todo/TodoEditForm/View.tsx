import {Fields} from '../../../../../../../packages/form';
import React from 'react';

import {FormValues} from '@todo/forms/addTodo';

type Props = {
  fields: Fields<FormValues>;
  onPressButton: () => void;
};

export const TodoEditForm: React.FC<Props> = ({fields, onPressButton}) => {
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          タイトル
        </span>
        <input type="text" className="form-control" {...fields.title} />
        <span className="input-group-text" id="inputGroup-sizing-sm">
          詳細
        </span>
        <input type="text" className="form-control" {...fields.description} />

        <button
          onClick={onPressButton}
          className="btn btn-outline-primary"
          type="button"
        >
          Todo編集
        </button>
      </div>
      <div>{fields.title.error?.message}</div>
      <div>{fields.description?.error?.message}</div>
    </>
  );
};
