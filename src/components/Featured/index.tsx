import React from 'react';
import FeaturedCard from './Card';

const MyComponent: React.FC = () => {
  return (
    <section className="my-16 md:container md:mx-auto flex flex-col font-montserrat">
      <h1 className="text-3xl text-left font-semibold leading-10 mb-12 px-10 md:px-20">
        Featured Properties on our <br /> Listing
      </h1>

      <div className="w-full px-5 md:px-20 grid md:grid-cols-2 gap-x-4 gap-y-8 justify-items-center lg:grid-cols-3 md:gap-x-8 lg:gap-y-16">
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
      </div>
    </section>
  );
};

export default MyComponent;
