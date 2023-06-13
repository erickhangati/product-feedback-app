import React, { useContext } from 'react';
import Link from 'next/link';
import Bullet from '../ui/icons/Bullet';
import { AppContext } from '../../context/AppContext';
import styles from './Roadmap.module.scss';

const Roadmap = () => {
  const appCtx = useContext(AppContext);

  const roadMapNumbers = (status: string) => {
    const filtered = appCtx.appData?.productRequests.filter(
      (request) => request.status === status
    );
    return filtered?.length;
  };

  return (
    <div className={styles.roadmap}>
      <div className={styles['roadmap-heading']}>
        <h3>Roadmap</h3>
        <Link href='/roadmap'>
          <span>View</span>
        </Link>
      </div>
      <div className={styles['roadmap-status']}>
        <div className={styles['status-item']}>
          <Bullet />
          <span className={styles['status-item__status']}>Planned</span>
          <span className={styles['status-item__number']}>
            {roadMapNumbers('planned')}
          </span>
        </div>
        <div className={`${styles['status-item']} ${styles.spacer}`}>
          <Bullet className={styles['bullet--purple']} />
          <span className={styles['status-item__status']}>In-Progress</span>
          <span className={styles['status-item__number']}>
            {roadMapNumbers('in-progress')}
          </span>
        </div>
        <div className={`${styles['status-item']} ${styles.spacer}`}>
          <Bullet className={styles['bullet--blue']} />
          <span className={styles['status-item__status']}>Live</span>
          <span className={styles['status-item__number']}>
            {roadMapNumbers('live')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
