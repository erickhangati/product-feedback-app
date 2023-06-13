import React, { useContext, useEffect, useState } from 'react';

import Badge from '../ui/badge/Badge';
import { AppContext } from '../../context/AppContext';

import styles from './Categories.module.scss';

const categories = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

const Categories = () => {
  const [active, setActive] = useState('All');
  const appCtx = useContext(AppContext);

  const filterCategories = (catergoryFilter: string) => {
    if (appCtx.suggestions) {
      if (catergoryFilter === 'all') {
        const suggestions = appCtx.appData?.productRequests.filter(
          (request) => request.status === 'suggestion'
        );

        if (suggestions) appCtx.setSuggestions(() => suggestions);
        return;
      }

      const suggestions = appCtx.appData?.productRequests
        .filter((request) => request.status === 'suggestion')
        .filter((request) => request.category === catergoryFilter);

      if (suggestions) appCtx.setSuggestions(() => suggestions);
    }
  };

  const clickHandler = (category: string) => {
    setActive(() => category);
    if (category === 'All') filterCategories('all');
    if (category === 'UI') filterCategories('ui');
    if (category === 'UX') filterCategories('ux');
    if (category === 'Enhancement') filterCategories('enhancement');
    if (category === 'Bug') filterCategories('bug');
    if (category === 'Feature') filterCategories('feature');
  };

  return (
    <div className={styles.categories}>
      {categories.map((category, index) => (
        <Badge
          key={index}
          className={category === active ? styles.active : ''}
          onClick={clickHandler.bind(null, category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};

export default Categories;
