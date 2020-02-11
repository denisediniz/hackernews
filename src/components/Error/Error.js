import React from 'react';
import styles from './index.module.scss';

const Error = () => (
  <div className={`${styles.columns} ${styles['is-centered']}`}>
    <div className={`${styles.column} ${styles['is-narrow']}`}>
      <div
        className={`${styles.notification} ${styles['is-danger']} ${styles['is-light']}`}
      >
        Something went wrong.
      </div>
    </div>
  </div>
);

export default Error;
