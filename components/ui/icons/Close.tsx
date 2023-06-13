import React from 'react';

interface Props {
  onClick?: () => void;
  className?: string;
}

const Close: React.FC<Props> = ({ onClick, className }) => {
  return (
    <svg
      width='18'
      height='17'
      viewBox='0 0 18 17'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
      className={className}
    >
      <path
        d='M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z'
        fill='#FFF'
        fillRule='evenodd'
      />
    </svg>
  );
};

export default Close;
