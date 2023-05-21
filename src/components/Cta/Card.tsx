import { FC, ReactNode } from 'react';

interface CardProps {
  image: {
    title: string;
    desc: string;
    button?: ReactNode;

  };
  noCard?: boolean;
  children?: ReactNode;

}

const Card: FC<CardProps> = ({ image, noCard, children }) => {
  return (
    <div className="absolute top-8 md:top-16 mx-10 md:left-20 md:bottom-16 md:w-2/5 rounded-sm bg-black bg-opacity-30 py-10 px-14 text-white font-montserrat flex flex-col justify-between">
      <div>
        <h1 className="text-xl md:text-4xl font-bold leading-10 mb-4 max-w-xs">{image.title}</h1>
        <p className="text-sm md:text-base font-normal leading-7 max-w-sm">{image.desc}</p>
      </div>
      {image.button}
    </div>
  );
};

export default Card;


