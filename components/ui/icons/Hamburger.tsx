import React from 'react';

interface Props {
  onClick?: () => void;
}

const Hamburger: React.FC<Props> = ({ onClick }) => {
  return (
    <svg
      width='20'
      height='17'
      viewBox='0 0 20 17'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
    >
      <g fill='#FFF' fillRule='evenodd'>
        <path d='M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z' />
      </g>
    </svg>
  );
};

export default Hamburger;
