import { useState } from 'react';

const Card = () => {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4 text-white select-none xl:gap-6">
      <div className="w-full h-60 rounded-lg shadow-lg xl:h-80 relative overflow-hidden">
        <slot></slot>
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
