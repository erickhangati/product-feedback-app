import React from 'react';
import Backdrop from './Backdrop';
import LoginForm from './LoginForm';

interface Props {
  loginHandler?: () => void;
}

const Login: React.FC<Props> = ({ loginHandler }) => {
  return (
    <>
      <div id='backdrop'>
        <Backdrop />
      </div>
      <div id='overlay'>
        <LoginForm loginHandler={loginHandler} />
      </div>
    </>
  );
};

export default Login;
