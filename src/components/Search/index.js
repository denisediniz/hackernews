import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import styles from './index.module.scss';

class Search extends Component {
  componentDidMount() {
    this.input && this.input.focus();
  }

  render() {
    const { value, onChange, onSubmit, children } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <div
          className={`${styles.field} ${styles['has-addons']} ${styles['has-addons-centered']}`}
        >
          <div className={styles.control}>
            <input
              className={styles.input}
              type="text"
              value={value}
              onChange={onChange}
              ref={element => (this.input = element)}
            />
          </div>
          <div className={styles.control}>
            <Button
              onClick={() => {}}
              className={`${styles.button} ${styles['is-primary']}`}
              type="submit"
            >
              {children}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

Search.propTypes = {
  value: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Search;
