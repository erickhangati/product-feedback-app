import React from 'react';
import Link from 'next/link';
import Empty from '../ui/illustrations/Empty';
import Button from '../ui/button/Button';

import styles from './PageNotFound.module.scss';

const PageNotFound = () => {
  return (
    <div className={styles['page-not-found']}>
      <Empty />
      <div className={styles['page-not-found__content']}>
        <h2>404!</h2>
        <p>
          Oops sorry! Seems you are trying to access a resource that does not
          exist on this server.
        </p>
        <Link href='/'>
          <Button className={styles['page-not-found__content-button']}>
            Go To Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
