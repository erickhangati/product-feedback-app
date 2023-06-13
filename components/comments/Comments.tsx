import React from 'react';
import CommentsIcon from '../ui/icons/CommentsIcon';
import styles from './Comments.module.scss';

interface Props {
  numberOfComments: number | undefined;
}

const Comments: React.FC<Props> = ({ numberOfComments }) => {
  return (
    <div className={styles.comments}>
      <CommentsIcon />
      <span>{numberOfComments !== undefined ? numberOfComments : 0}</span>
    </div>
  );
};

export default Comments;
