import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface CardProps {
  image: {
    title: string;
    desc: string;
    buttonLink: string;
    buttonText: string;

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
      <Link href={image.buttonLink} 
      className="py-3 px-5 md:py-4 md:px-10 inline-block rounded-full 
                w-max text-sm text-black 
                font-bold bg-gradient-to-b 
                from-darkyellow to-semidarkyellow 
                hover:from-semidarkyellow 
                hover:to-darkyellow">{image.buttonText}</Link>
    </div>
  );
};

export default Card;


