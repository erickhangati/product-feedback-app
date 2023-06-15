import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, FormikHelpers } from 'formik';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import FormControl from '../ui/form/form-components/FormControl';
import BackButton from '../ui/button/BackButton';
import Button from '../ui/button/Button';
import NewFeedbackIcon from '../ui/icons/NewFeedbackIcon';
import EditFeedbackIcon from '../ui/icons/EditFeedbackIcon';
import Login from '../login/Login';

import { AppContext } from '../../context/AppContext';
import { categoryOptions, statusOptions } from '../../data/form-data';
import styles from './FeedbackForm.module.scss';

import {
  FeedbackValues,
  feedbackInitialValues,
  feedbackValidationSchema,
} from '../../data/form-data';

interface transformedFeedbackValues {
  _id?: string;
  user?: string;
  status: string;
  title: string;
  description: string;
  category: string;
}

const FeedbackForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    feedback,
    setFeedback,
    suggestions,
    setSuggestions,
    appData,
    setAppData,
  } = useContext(AppContext);
  const { data: session, status } = useSession();
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (feedback) setIsEditing(() => true);
    if (!session) setShowLogin(() => true);
  }, []);

  const cancelHandler = () => {
    router.back();
  };

  const deleteHandler = async () => {
    setIsDeleting(() => true);

    try {
      const response = await fetch('/api/product-requests', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: feedback._id, isDeleting: true }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      setIsDeleting(() => false);
      return;
    }

    toast('Feedback deleted successfully.');

    // UPDATING SUGGESTIONS STATE
    const newSuggestions = suggestions?.filter(
      (item) => item._id !== feedback._id
    );

    setSuggestions(() => newSuggestions);

    // UPDATING APP DATA STATE
    const newProductRequests = appData?.productRequests.filter(
      (item) => item._id !== feedback._id
    );

    setAppData((prev) => ({ ...prev, productRequests: newProductRequests }));

    setFeedback(() => null);
    setIsDeleting(() => false);
    router.push('/');
  };

  const loginHandler = () => {
    setShowLogin((prev) => !prev);
  };

  const postFeedback = async (
    transformedFeedback: transformedFeedbackValues,
    method: string
  ) => {
    const response = await fetch('/api/product-requests', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedFeedback),
    });

    const data = await response.json();
    return data;
  };

  const onSubmit = async (
    values: FeedbackValues,
    { setSubmitting, resetForm }: FormikHelpers<FeedbackValues>
  ) => {
    if (!session) {
      setShowLogin(() => true);
      return;
    }

    const feedbackValues = {
      title: values.title,
      description: values.description,
      category: values.category,
    };

    if (!isEditing) {
      const transformedFeedback = {
        ...feedbackValues,
        status: 'suggestion',
        user: '6480227d498d6f7546f11c30',
      };

      setSubmitting(true);

      // POSTING FEEDBACK
      let data;

      try {
        data = await postFeedback(transformedFeedback, 'POST');
        console.log(data);
      } catch (error) {
        console.error('Failed to post feedback');
        return;
      }

      toast('Feedback created successfully.');

      // UPDATE STATE
      const newSuggestions = [
        ...suggestions,
        {
          ...transformedFeedback,
          upvotes: 0,
          _id: data.results.insertedId,
          user: {
            _id: '6480227d498d6f7546f11c30',
            image: '/images/user-images/image-zena.jpg',
            name: 'Zena Kelley',
            username: 'velvetround',
            email: 'velvetround@gmail.com',
          },
        },
      ];

      setSuggestions(() => newSuggestions);

      // RESETTING FORM
      setSubmitting(false);
      resetForm();
      router.push('/');

      return;
    }

    const transformedFeedback = {
      ...feedbackValues,
      _id: values._id,
      status: values.status,
    };

    setSubmitting(true);

    let data;

    try {
      // POSTING FEEDBACK
      data = await postFeedback(transformedFeedback, 'PATCH');
      console.log(data);
    } catch (error) {
      console.error('Failed to post feedback');
      return;
    }

    toast('Feedback updated successfully.');

    // UPDATE FEEDBACK STATUS
    const editedFeedback = {
      ...feedback,
      ...transformedFeedback,
    };

    setFeedback(() => editedFeedback);

    // UPDATE SUGGESTIONS STATUS
    const suggestionsCopy = [...suggestions];
    const feedbackIndex = suggestionsCopy.findIndex(
      (feedback) => feedback._id === values._id
    );

    suggestionsCopy.splice(feedbackIndex, 1, editedFeedback);
    setSuggestions(() => suggestionsCopy);

    // RESETTING FORM
    setSubmitting(false);
    resetForm();
    router.back();
  };

  return (
    <>
      {/* LOGIN FORM */}
      {!session && status !== 'loading' && showLogin && (
        <Login loginHandler={loginHandler} />
      )}

      {/* FEEDBACK FORM */}
      <div className={styles['feedback']}>
        <BackButton className={styles['back-button']} />

        <div className={styles['feedback-form']}>
          {feedback && <EditFeedbackIcon className={styles.icon} />}
          {!feedback && <NewFeedbackIcon className={styles.icon} />}

          <h2>
            {feedback?.title
              ? `Editing '${feedback.title}'`
              : 'Create New Feedback'}
          </h2>

          <Formik
            enableReinitialize
            initialValues={feedback || feedbackInitialValues}
            validationSchema={feedbackValidationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className={styles.form}>
                  <FormControl
                    name='title'
                    control='input'
                    label='Feedback Title'
                    description='Add a short, descriptive headline'
                    error={
                      feedback
                        ? formik.errors.title
                        : formik.errors.title && formik.touched.title
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.handleChange(e);
                    }}
                    value={formik.values.title}
                  />

                  <FormControl
                    name='category'
                    control='select'
                    label='Category'
                    description='Choose a category for your feedback'
                    error={
                      feedback
                        ? formik.errors.category
                        : formik.errors.category && formik.touched.category
                    }
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      formik.handleChange(e);
                    }}
                    value={formik.values.category}
                    options={categoryOptions}
                  />

                  {feedback && (
                    <FormControl
                      name='status'
                      control='select'
                      label='Update Status'
                      description='Change feedback state'
                      error={formik.errors.status}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        formik.handleChange(e);
                      }}
                      value={formik.values.status}
                      options={statusOptions}
                    />
                  )}

                  <FormControl
                    name='description'
                    control='input'
                    label='Feedback Detail'
                    description='Include any specific comments on what should be improved, added, etc.'
                    as='textarea'
                    error={
                      formik.errors.description && formik.touched.description
                    }
                    rows={5}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      formik.handleChange(e);
                    }}
                    value={formik.values.description}
                  />

                  <div className={styles['form__buttons']}>
                    {feedback && (
                      <Button
                        className={`${styles['form__buttons--delete']}${
                          isDeleting ? ` ${styles.submitting}` : ''
                        }`}
                        type='button'
                        onClick={deleteHandler}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </Button>
                    )}

                    <Button
                      className={styles['form__buttons--cancel']}
                      type='button'
                      onClick={cancelHandler}
                    >
                      Cancel
                    </Button>

                    <Button
                      className={`${styles['form__buttons--submit']}${
                        formik.isSubmitting ? ` ${styles.submitting}` : ''
                      }`}
                      type='submit'
                      disabled={formik.isSubmitting}
                    >
                      {feedback
                        ? formik.isSubmitting
                          ? 'Saving Changes..'
                          : 'Save Changes'
                        : formik.isSubmitting
                        ? 'Adding Feedback...'
                        : 'Add Feedback'}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
