import React from 'react';
import Link from 'next/link';

import Bullet from '../ui/icons/Bullet';
import Badge from '../ui/badge/Badge';
import Upvotes from '../ui/upvotes/Upvotes';
import Comments from '../comments/Comments';

import { ProductRequest } from '../../data/data-types/types';
import styles from './RoadmapTile.module.scss';

interface Props {
  className: string;
  productRequest: ProductRequest;
}

const RoadmapTile: React.FC<Props> = ({ className, productRequest }) => {
  const classes = `${styles['roadmap-tile']} ${className}`;
  const status = productRequest.status
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Link href={`/${productRequest._id}`}>
      <div className={classes}>
        <div className={styles['tile-status']}>
          <Bullet />
          <span>{status}</span>
        </div>
        <h3>{productRequest.title}</h3>
        <p>{productRequest.description}</p>
        <Badge>{productRequest.category}</Badge>
        <div className={styles['tile-interactions']}>
          <Upvotes
            className={styles['tile-interactions__votes']}
            votes={productRequest.upvotes}
          />
          <Comments numberOfComments={productRequest.comments?.length} />
        </div>
      </div>
    </Link>
  );
};

export default RoadmapTile;
