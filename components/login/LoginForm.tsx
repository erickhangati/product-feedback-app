import React from 'react';
import { Formik, Form } from 'formik';
import { FormikHelpers } from 'formik';
import { signIn } from 'next-auth/react';

import FormControl from '../ui/form/form-components/FormControl';
import Button from '../ui/button/Button';
import Close from '../ui/icons/Close';
import SignInGoogle from '../sign-in-google/SignInGoogle';

import styles from './LoginForm.module.scss';

import {
  LoginValues,
  loginInitialValues,
  loginValidationSchema,
} from '../../data/form-data';

interface Props {
  loginHandler?: () => void;
}

const LoginForm: React.FC<Props> = ({ loginHandler }) => {
  const signInWithGoogleHandler = () => {
    signIn('google'); // Initiates Google authentication
  };

  const onSubmit = async (
    values: LoginValues,
    { setSubmitting, resetForm }: FormikHelpers<LoginValues>
  ) => {
    setSubmitting(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    console.log(result);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className={styles['login-form']}>
      <Close className={styles['login-form__close']} onClick={loginHandler} />
      {/* <SignInGoogle onClick={signInWithGoogleHandler} />
      <div className={styles['with-email']}>
        <div />
        <span>or with email</span>
        <div />
      </div> */}
      <h2>Login</h2>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className={styles.form}>
              <FormControl
                name='email'
                control='input'
                label='Email'
                error={formik.errors.email && formik.touched.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formik.handleChange(e);
                }}
              />
              <FormControl
                name='password'
                control='input'
                label='Password'
                error={formik.errors.password && formik.touched.password}
                showIcon={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formik.handleChange(e);
                }}
              />

              <div className={styles['form-actions']}>
                <div className={styles['demo-login']}>
                  <h4>Demo Login</h4>
                  <p>
                    <span>Email: </span>test@gmail.com
                  </p>
                  <p>
                    <span>Password: </span>
                    test3895!
                  </p>
                </div>
                <Button
                  className={`${styles['submit-button']}${
                    formik.isSubmitting ? ` ${styles.submitting}` : ''
                  }`}
                  type='submit'
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
