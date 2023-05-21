import React from 'react';
import FeaturedItem from './Card';

const FeaturedSection: React.FC = () => {
  return (
    <section className="my-16 md:container md:mx-auto flex flex-col font-montserrat">
      <h1 className="text-3xl text-left font-semibold leading-10 mb-12 px-10 md:px-20">
        Featured Properties on our <br /> Listing
      </h1>
      <div className="w-full px-5 md:px-20 grid md:grid-cols-2 gap-x-4 gap-y-8 justify-items-center lg:grid-cols-3 md:gap-x-8 lg:gap-y-16">
        <FeaturedItem
          title="Property 1"
          address="Address 1"
          rooms={2}
          tubs={2}
          beds={2}
          foots={0}
          // Additional props as needed
        />
        <FeaturedItem
          title="Property 2"
          address="Address 2"
          rooms={3}
          tubs={2}
          beds={3}
          foots={1}
          // Additional props as needed
        />
        <FeaturedItem
          title="Property 3"
          address="Address 3"
          rooms={1}
          tubs={1}
          beds={1}
          foots={2}
          // Additional props as needed
        />
        {/* Add more instances of FeaturedItem with the required props */}
      </div>
    </section>
  );
};

export default FeaturedSection;

