import React from 'react';

type CardProps = {
  title: string;
  children?: React.ReactNode;
};


const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="w-full h-72 bg-white shadow-lg rounded-lg p-3 xl:h-80 flex flex-col justify-between">
      <div className="w-full h-3/4">{children}</div>
      <div className="pl-2">
        <h3 className="text-base font-bold text-gray-800">{title}</h3>
        <span className="text-sm text-gray-500">Lorem ipsum dolor.</span>
      </div>
    </div>
  );
};

export default Card;

