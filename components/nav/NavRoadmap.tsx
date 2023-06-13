import React from 'react';
import Link from 'next/link';
import Button from '../ui/button/Button';
import BackButton from '../ui/button/BackButton';
import styles from './NavRoadmap.module.scss';

const NavRoadmap = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles['nav-buttons']}>
        <BackButton className={styles['nav-buttons__back']} />
        <h2>Roadmap</h2>
      </div>
      <Button className={styles.button}>+ Add Feedback</Button>
    </nav>
  );
};

export default NavRoadmap;
