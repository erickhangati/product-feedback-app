import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import BackButton from '../ui/button/BackButton';
import Button from '../ui/button/Button';
import SuggestionItem from '../suggestions/SuggestionItem';

import { AppContext } from '../../context/AppContext';
import { ProductRequest } from '../../data/data-types/types';
import styles from './Feedback.module.scss';

interface Props {
  request: ProductRequest;
}

const Feedback: React.FC<Props> = ({ request }) => {
  const appCtx = useContext(AppContext);
  const router = useRouter();

  const editFeedbackHandler = () => {
    appCtx.setFeedback(() => request);
    router.push('/feedback');
  };

  return (
    <>
      <div className={styles.feedback}>
        <div className={styles['feedback-buttons']}>
          <BackButton className={styles['feedback-buttons__back']} />
          <Button
            className={styles['feedback-buttons__edit']}
            onClick={editFeedbackHandler}
          >
            Edit Feedback
          </Button>
        </div>
        <SuggestionItem
          suggestion={request}
          className={styles['feedback__suggestion']}
        />
      </div>
    </>
  );
};

export default Feedback;
