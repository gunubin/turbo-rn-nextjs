import React from 'react';

import {Dialog} from '@web/components/features/modal/Dialog';

import {Props} from './types';

export const MessageDialog: React.FC<Props> = ({
  message,
  title,
  type,
  ...modalProps
}) => {
  return (
    <Dialog {...modalProps}>
      {title && (
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
      )}
      {message && (
        <div className="modal-body">
          <p>{message}</p>
        </div>
      )}
    </Dialog>
  );
};
