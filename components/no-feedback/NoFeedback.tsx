import React from 'react';
import Empty from '../ui/illustrations/Empty';
import Button from '../ui/button/Button';
import styles from './NoFeedback.module.scss';

const NoFeedback = () => {
  return (
    <div className={styles['no-feedback']}>
      <Empty />
      <div className={styles['no-feedback-content']}>
        <h2>There is no feedback yet.</h2>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <Button className={styles['no-feedback-content__button']}>
          + Add Feedback
        </Button>
      </div>
    </div>
  );
};

export default NoFeedback;
