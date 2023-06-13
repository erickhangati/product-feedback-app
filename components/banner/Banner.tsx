import React, { useEffect } from 'react';
import Hamburger from '../ui/icons/Hamburger';
import Close from '../ui/icons/Close';
import styles from './Banner.module.scss';

interface Props {
  menuIsOpen?: boolean;
  menuOpenHandler?: () => void;
}

const Banner: React.FC<Props> = ({ menuIsOpen, menuOpenHandler }) => {
  useEffect(() => {
    document.body.style.overflowY = menuIsOpen ? 'hidden' : '';

    // Clean up the effect by restoring the original overflowY value
    return () => {
      document.body.style.overflowY = '';
    };
  }, [menuIsOpen]);

  return (
    <>
      <div className={styles.banner}>
        <h1>Frontend Mentor</h1>
        <h2>Feedback Board</h2>
      </div>
      <div className={styles['top-banner']}>
        <div className={styles['top-banner__text']}>
          <h1>Frontend Mentor</h1>
          <h2>Feedback Board</h2>
        </div>
        {!menuIsOpen && <Hamburger onClick={menuOpenHandler} />}
        {menuIsOpen && <Close onClick={menuOpenHandler} />}
      </div>
    </>
  );
};

export default Banner;
