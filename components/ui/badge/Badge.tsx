import React, { ReactNode } from 'react';

import styles from './Badge.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Badge: React.FC<Props> = ({ children, className, onClick }) => {
  const classes = `${styles.badge}${className ? ` ${className}` : ''}${
    children.toString().length === 2 ? ` ${styles['two-letters']}` : ''
  }`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Badge;
