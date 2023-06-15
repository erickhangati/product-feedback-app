import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { FormikHelpers } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import FormControl from '../ui/form/form-components/FormControl';
import Button from '../ui/button/Button';
import Login from '../login/Login';

import { AppContext } from '../../context/AppContext';
import styles from './CommentsForm.module.scss';

import {
  CommentValues,
  commentInitialValues,
  commentValidationSchema,
} from '../../data/form-data';

interface Props {
  requestId: string;
  userEmail?: string;
}

const CommentsForm: React.FC<Props> = ({ requestId, userEmail }) => {
  const [remainingCount, setRemainingCount] = useState(255);
  const [isLogging, setIsLogging] = useState(false);
  const { data: session, status } = useSession();
  const { feedback, setFeedback } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // HIDDING VERTICAL SCROLL
    document.body.style.overflowY = isLogging ? 'hidden' : '';

    // Clean up the effect by restoring the original overflowY value
    return () => {
      document.body.style.overflowY = '';
    };
  }, [isLogging]);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const maxLength = 225; // Set your desired character limit
    const remaining = maxLength - value.length;
    setRemainingCount(() => remaining);
  };

  const onSubmit = async (
    values: CommentValues,
    { setSubmitting, resetForm }: FormikHelpers<CommentValues>
  ) => {
    if (!session) {
      setIsLogging(() => true);
      return;
    }

    const comment = {
      requestId,
      comment: values.comment,
      userEmail,
    };

    setSubmitting(true);

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });

    const data = await response.json();
    console.log(data);

    // UPDATING FEEDBACK STATE
    const newComment = {
      _id: data.results.insertedId,
      content: values.comment,
      user: {
        _id: '6480227d498d6f7546f11c30',
        image: '/images/user-images/image-zena.jpg',
        name: 'Zena Kelley',
        username: 'velvetround',
        email: 'velvetround@gmail.com',
      },
    };

    const feedbackCopy = {
      ...feedback,
    };

    const newFeedback = {
      ...feedbackCopy,
      comments: [...feedbackCopy.comments, newComment],
    };

    setFeedback(() => newFeedback);

    resetForm();
    setSubmitting(false);
    setRemainingCount(() => 225);
    setIsLogging(() => false);
    router.replace(router.asPath);
  };

  return (
    <>
      {isLogging && !session && <Login />}
      <div className={styles.comment}>
        <h2>Add Comment</h2>
        <Formik
          initialValues={commentInitialValues}
          validationSchema={commentValidationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form className={styles['comment-form']}>
                <FormControl
                  name='comment'
                  control='input'
                  as='textarea'
                  error={formik.errors.comment && formik.touched.comment}
                  maxLength={225}
                  rows={5}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    formik.handleChange(e);
                    handleTextareaChange(e);
                  }}
                />
                <div className={styles['comment-form__actions']}>
                  <span>
                    {remainingCount}{' '}
                    {`character${remainingCount === 1 ? '' : 's'} left`}
                  </span>
                  <Button
                    className={`${styles['comment-form__button']}${
                      formik.isSubmitting ? ` ${styles.submitting}` : ''
                    }`}
                    type='submit'
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting
                      ? 'Posting Comment...'
                      : 'Post Comment'}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CommentsForm;
