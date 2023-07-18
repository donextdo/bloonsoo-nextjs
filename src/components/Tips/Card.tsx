import { useState } from 'react';

type CardProps = {
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {

  return (
    <div className="w-full flex flex-col gap-4 text-white select-none xl:gap-6">
      <div className="w-full h-60 rounded-lg shadow-lg xl:h-80 relative overflow-hidden">
        {children}
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-semibold text-black xl:text-base">
          Choose the right property
        </h4>
        <p className="text-xs text-gray-500 xl:text-sm">Economy</p>
      </div>
    </div>
  );
};

export default Card;
