import React from 'react';
import { useRouter } from 'next/router';

import Button from './Button';
import ArrowLeft from '../icons/ArrowLeft';
import styles from './BackButton.module.scss';

interface Props {
  className: string;
}

const BackButton: React.FC<Props> = ({ className }) => {
  const classes = `${styles.button}${className ? ` ${className}` : ''}`;
  const router = useRouter();

  const buttonClickHandler = () => {
    router.back();
  };

  return (
    <Button className={classes} onClick={buttonClickHandler}>
      <ArrowLeft />
      <span>Go Back</span>
    </Button>
  );
};

export default BackButton;
