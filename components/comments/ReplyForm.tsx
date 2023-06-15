import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Formik, Form } from 'formik';
import { FormikHelpers } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import FormControl from '../ui/form/form-components/FormControl';
import Button from '../ui/button/Button';

import { AppContext } from '../../context/AppContext';
import styles from './ReplyForm.module.scss';

import {
  ReplyValues,
  replyInitialValues,
  replyValidationSchema,
} from '../../data/form-data';

interface Props {
  className?: string;
  replyingTo: string;
  commentId: string;
  setIsReplying: Dispatch<SetStateAction<string>>;
}

const ReplyForm: React.FC<Props> = ({
  className,
  replyingTo,
  commentId,
  setIsReplying,
}) => {
  const { data: session, status } = useSession();
  const { feedback, setFeedback, suggestions, setSuggestions } =
    useContext(AppContext);
  const router = useRouter();

  const onSubmit = async (
    values: ReplyValues,
    { setSubmitting, resetForm }: FormikHelpers<ReplyValues>
  ) => {
    const reply = {
      content: values.reply,
      userEmail: session.user.email,
      commentId,
      replyingTo,
    };

    setSubmitting(true);

    let data;

    try {
      const response = await fetch('/api/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reply),
      });

      data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Failed to add reply.');
      return;
    }

    toast('Reply added successfully');

    // UPDATE FEEDBACK STATE

    const newReply = {
      _id: data.addedReplyId,
      content: values.reply,
      replyingTo: data.replyingToUser,
      user: {
        _id: '6480227d498d6f7546f11c30',
        image: '/images/user-images/image-zena.jpg',
        name: 'Zena Kelley',
        username: 'velvetround',
        email: 'velvetround@gmail.com',
      },
    };

    const comment = feedback.comments.find(
      (comment) => comment._id === commentId
    );
    const newCommentReplies = [...comment.replies, newReply];
    comment.replies = newCommentReplies;
    const commentIndex = feedback.comments.findIndex(
      (comment) => comment._id === commentId
    );

    const feedbackCopy = { ...feedback };
    feedbackCopy.comments.splice(commentIndex, 1, comment);

    setFeedback(() => feedbackCopy);

    // UPDATE SUGGESTIONS STATE
    const suggestionsCopy = [...suggestions];
    console.log(suggestionsCopy);

    setSubmitting(false);
    resetForm();
    setIsReplying(() => null);
    router.replace(router.asPath);
  };

  return (
    <Formik
      initialValues={replyInitialValues}
      validationSchema={replyValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form
            className={`${styles['reply-form']}${
              className ? ` ${className}` : ''
            }`}
          >
            <FormControl
              name='reply'
              control='input'
              as='textarea'
              error={formik.errors.reply && formik.touched.reply}
              rows={4}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                formik.handleChange(e);
              }}
              className={styles['reply-form__input']}
            />
            <Button
              className={`${styles['reply-form__button']}${
                formik.isSubmitting ? ` ${styles.submitting}` : ''
              }`}
              type='submit'
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Posting Reply...' : 'Post Reply'}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReplyForm;
