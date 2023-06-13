import React from 'react';

interface Props {
  className?: string;
}

const ArrowDown: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width='10'
      height='7'
      viewBox='0 0 10 7'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M1 1l4 4 4-4'
        stroke='#4661E6'
        strokeWidth='2'
        fill='none'
        fillRule='evenodd'
      />
    </svg>
  );
};

export default ArrowDown;
