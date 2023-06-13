import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../backdrop/Backdrop';
import Overlay from '../overlay/Overlay';

const MenuModal = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('backdrop')! as HTMLDivElement
      )}
      {ReactDOM.createPortal(
        <Overlay />,
        document.getElementById('overlay')! as HTMLDivElement
      )}
    </>
  );
};

export default MenuModal;
