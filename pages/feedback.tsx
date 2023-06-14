import React, { useContext } from 'react';
import Head from 'next/head';
import FeedbackForm from '../components/feedback/FeedbackForm';
import { AppContext } from '../context/AppContext';

const FeedbackPage = () => {
  const { feedback } = useContext(AppContext);

  return (
    <>
      <Head>
        <title>
          {feedback ? `Editing: ${feedback.title}` : 'Create new feadback'}
        </title>
        <meta name='description' content='Suggestions feedbacks.' />
      </Head>
      <FeedbackForm />
    </>
  );
};

export default FeedbackPage;
