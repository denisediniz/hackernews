import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import Button from '../Button';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
};

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { sortKey, isSortReverse } = this.state;

    const { list, onDismiss } = this.props;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
    return (
      <>
        <div className={`${styles.columns} ${styles['is-centered']}`}>
          <div className={`${styles.column} ${styles['is-narrow']}`}>
            <p className={styles['has-text-centered']}>Order by</p>
            <div
              className={`${styles.field} ${styles['has-addons']} ${styles['has-addons-centered']}`}
            >
              <p className={styles.control}>
                <Sort
                  sortKey={'TITLE'}
                  onSort={this.onSort}
                  activeSortKey={sortKey}
                >
                  Title
                </Sort>
              </p>
              <p className={styles.control}>
                <Sort
                  sortKey={'AUTHOR'}
                  onSort={this.onSort}
                  activeSortKey={sortKey}
                >
                  Author
                </Sort>
              </p>
              <p className={styles.control}>
                <Sort
                  sortKey={'COMMENTS'}
                  onSort={this.onSort}
                  activeSortKey={sortKey}
                >
                  Comments
                </Sort>
              </p>
              <p className={styles.control}>
                <Sort
                  sortKey={'POINTS'}
                  onSort={this.onSort}
                  activeSortKey={sortKey}
                >
                  Points
                </Sort>
              </p>
            </div>
          </div>
        </div>

        {reverseSortedList.map(item => (
          <div key={item.objectID}>
            <article className={`${styles.columns} ${styles['is-vcentered']}`}>
              <div className={styles.column}>
                <p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </p>
                <p>
                  by {item.author} | {item.num_comments} comments |{' '}
                  {item.points} points
                </p>
              </div>
              <div className={`${styles.column} ${styles['is-narrow']}`}>
                <Button
                  onClick={() => onDismiss(item.objectID)}
                  className={`${styles.button} ${styles['is-small']} ${styles['is-danger']} ${styles['is-outlined']}`}
                >
                  <span>Dismiss</span>
                  <span className={`${styles.icon} ${styles['is-small']}`}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </Button>
              </div>
            </article>
            <hr />
          </div>
        ))}
      </>
    );
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      url: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  const sortClass = classNames(
    `${styles.button} ${styles['is-primary']} ${styles['is-light']}`,
    {
      [`${styles['is-active']}`]: sortKey === activeSortKey
    }
  );

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>
  );
};

export default Table;
