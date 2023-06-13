import React from 'react';

interface Props {
  className?: string;
}

const Bullet: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width='8'
      height='8'
      viewBox='0 0 8 8'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='4' cy='4' r='4' fill='#F49F85' />
    </svg>
  );
};

export default Bullet;
