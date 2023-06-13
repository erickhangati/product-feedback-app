import React from 'react';
import ArrowUp from '../icons/ArrowUp';
import styles from './Upvotes.module.scss';

interface Props {
  votes: number;
  className?: string;
  upvoteHandler?: () => void;
}

const Upvotes: React.FC<Props> = ({ className, votes, upvoteHandler }) => {
  const classes = `${styles.upvotes}${className ? ` ${className}` : ''}`;

  return (
    <div className={classes} onClick={upvoteHandler}>
      <ArrowUp />
      <span>{votes || 0}</span>
    </div>
  );
};

export default Upvotes;
