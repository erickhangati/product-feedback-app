import React, { useState } from 'react';

import Banner from '../banner/Banner';
import Categories from '../categories/Categories';
import Roadmap from '../roadmap/Roadmap';
import MenuModal from '../modal/menu-modal/MenuModal';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuOpenHandler = () => {
    setMenuIsOpen((prev) => !prev);
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <Banner />
        <Categories />
        <Roadmap />
      </aside>
      <aside className={styles.topbar}>
        <Banner menuIsOpen={menuIsOpen} menuOpenHandler={menuOpenHandler} />
        {menuIsOpen && <MenuModal />}
      </aside>
    </>
  );
};

export default Sidebar;
