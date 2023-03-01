import React from 'react';

import {Props} from './types';

export const Toast: React.FC<Props> = (props) => {
  const {type = 'Success', onRequestClose} = props;

  return (
    <div
      className={`toast align-items-center text-white  show ${
        type === 'Success' && 'bg-primary'
      } ${type === 'Error' && 'bg-danger'}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{props.children}</div>
        <button
          onClick={onRequestClose}
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};
