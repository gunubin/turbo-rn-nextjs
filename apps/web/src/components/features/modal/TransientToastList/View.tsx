import React from 'react';

import {TransientToast} from './TransientToast';
import styles from './styles.module.scss';
import {Props} from './types';

export const TransientToastList: React.FC<Props> = ({ids}) => {
  const list = ids.map((id, index) => {
    const isLast = index === ids.length - 1;
    return (
      <div key={id}>
        <TransientToast id={id} />
        {!isLast && <div className="mt-1" />}
      </div>
    );
  });

  return <div className={styles.container}>{list}</div>;
};
