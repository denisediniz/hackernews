import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Button = ({ onClick, className, type, children }) => (
  <button onClick={onClick} className={className} type={type}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  className: `${styles.button} ${styles['is-primary']}`,
  type: 'button'
};

export default Button;
