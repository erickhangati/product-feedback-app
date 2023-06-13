import React from 'react';
import Google from '../ui/icons/Google';
import styles from './SignInGoogle.module.scss';

interface Props {
  onClick: () => void;
}

const SignInGoogle: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={styles['sign-in-google']} onClick={onClick}>
      <Google />
      <span>Sign in with Google</span>
    </div>
  );
};

export default SignInGoogle;
