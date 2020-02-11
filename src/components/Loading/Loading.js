import React from 'react';
import styles from './index.module.scss';

const Loading = () => (
  <button
    className={`${styles.button} ${styles['is-primary']} ${styles['is-loading']}`}
  >
    Loading
  </button>
);

export default Loading;
