import React, { useContext, useState } from 'react';

import ArrowDown from '../ui/icons/ArrowDown';
import ArrowUp from '../ui/icons/ArrowUp';
import Check from '../ui/icons/Check';
import { AppContext } from '../../context/AppContext';
import { AppState } from '../../data/types';

import styles from './Sort.module.scss';

const sortOptions = [
  'Most Votes',
  'Least Votes',
  'Most Comments',
  'Least Comments',
];

interface Props {
  className?: string;
}

const Sort: React.FC<Props> = ({ className }) => {
  const classes = `${styles['sort-container']}${
    className ? ` ${className}` : ''
  }`;

  const [clicked, setClicked] = useState(false);
  const [selected, setselected] = useState(sortOptions[0]);
  const appCtx = useContext(AppContext);

  const clickHandler = () => {
    setClicked((prev) => !prev);
  };

  const selectHandler = (selected: string) => {
    setselected(() => selected);
    setClicked(() => false);

    if (selected === 'Most Votes') {
      if (appCtx.suggestions) {
        const sortedRequests = [...appCtx.suggestions];
        sortedRequests.sort((a, b) => b.upvotes - a.upvotes);
        appCtx.setSuggestions(() => sortedRequests);
      }
    }

    if (selected === 'Least Votes') {
      if (appCtx.suggestions) {
        const sortedRequests = [...appCtx.suggestions];
        sortedRequests.sort((a, b) => a.upvotes - b.upvotes);
        appCtx.setSuggestions(() => sortedRequests);
      }
    }

    if (selected === 'Most Comments') {
      if (appCtx.suggestions) {
        const sortedRequests = [...appCtx.suggestions];
        sortedRequests.sort(
          (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
        );
        appCtx.setSuggestions(() => sortedRequests);
      }
    }

    if (selected === 'Least Comments') {
      if (appCtx.suggestions) {
        const sortedRequests = [...appCtx.suggestions];
        sortedRequests.sort(
          (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
        );
        appCtx.setSuggestions(() => sortedRequests);
      }
    }
  };

  return (
    <div className={classes}>
      <div className={styles.sort} onClick={clickHandler}>
        <p className={styles['sort-text']}>
          Sort by: <span>{selected}</span>
        </p>
        {clicked ? <ArrowUp /> : <ArrowDown />}
      </div>

      {clicked && (
        <ul className={styles.select}>
          {sortOptions.map((option, index) => (
            <li key={index} onClick={selectHandler.bind(null, option)}>
              <span className={option === selected ? styles.active : ''}>
                {option}
              </span>
              {option === selected && <Check />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sort;
