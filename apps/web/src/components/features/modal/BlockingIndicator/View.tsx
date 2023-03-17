import React from 'react';

import styles from './styles.module.scss';
import {Props} from './types';

// TODO: animation
export const BlockingIndicator: React.FC<Props> = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.background}>
        <div className="spinner-border text-light" role="status"></div>
      </div>
    </div>
  );
};
