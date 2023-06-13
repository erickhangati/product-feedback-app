import React, { useContext } from 'react';

import Sidebar from '../sidebar/Sidebar';
import Nav from '../nav/Nav';
import NoFeedback from '../no-feedback/NoFeedback';
import SuggestionItem from './SuggestionItem';

import { AppContext } from '../../context/AppContext';
import styles from './Suggestions.module.scss';

const Suggestions = () => {
  const appCtx = useContext(AppContext);

  return (
    <div className={styles.suggestions}>
      <Sidebar />
      <div className={styles['suggestions-main']}>
        <Nav />
        {appCtx.suggestions?.length === 0 && <NoFeedback />}
        {appCtx.suggestions?.length !== 0 && (
          <ul className={styles['suggestions-main__list']}>
            {appCtx.suggestions?.map((suggestion) => (
              <SuggestionItem key={suggestion._id} suggestion={suggestion} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
