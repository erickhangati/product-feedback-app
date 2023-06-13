import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props {
  children: ReactNode;
  className: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

const ButtonContainer: React.FC<Props> = ({
  children,
  className,
  onClick,
  type,
  disabled,
}) => {
  const classes = `${styles.button}${className ? ` ${className}` : ''}`;
  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonContainer;
