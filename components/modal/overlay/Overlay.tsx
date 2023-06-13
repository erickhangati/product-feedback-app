import React from 'react';
import Categories from '../../categories/Categories';
import Roadmap from '../../roadmap/Roadmap';
import styles from './Overlay.module.scss';

const Overlay = () => {
  return (
    <div className={styles.overlay}>
      <Categories />
      <Roadmap />
    </div>
  );
};

export default Overlay;
