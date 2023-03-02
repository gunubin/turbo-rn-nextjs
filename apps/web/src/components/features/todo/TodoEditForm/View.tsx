import React from 'react';

import {Fields} from '@app/lib/validations/types';
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
    </>
  );
};
