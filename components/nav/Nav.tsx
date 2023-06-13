import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import SuggestionsIcon from '../ui/icons/SuggestionsIcon';
import Button from '../ui/button/Button';
import Sort from '../sort/Sort';
import { AppContext } from '../../context/AppContext';

import styles from './Nav.module.scss';

const Nav = () => {
  const appCtx = useContext(AppContext);
  const router = useRouter();

  const addFeedbackHandler = () => {
    appCtx.setFeedback(() => null);
    router.push('/feedback');
  };

  return (
    <nav className={styles.nav}>
      <SuggestionsIcon className={styles['nav__suggestions-icon']} />
      <span className={styles['nav__suggestions']}>
        {appCtx.suggestions?.length} Suggestions
      </span>
      <Sort className={styles['nav__sort']} />
      <Button className={styles.button} onClick={addFeedbackHandler}>
        + Add Feedback
      </Button>
    </nav>
  );
};

export default Nav;
