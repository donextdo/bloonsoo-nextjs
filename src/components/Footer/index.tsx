import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import UI from './UI';

interface LinkItem {
  title: string;
  path: string;
}

const Footer: React.FC = () => {
  const find: LinkItem[] = [
    {
      title: 'Homes',
      path: '#',
    },
    {
      title: 'Apartments',
      path: '#',
    },
    {
      title: 'Villas',
      path: '#',
    },
    {
      title: 'Hotels',
      path: '#',
    },
  ];

  const company: LinkItem[] = [
    {
      title: 'About Us',
      path: '#',
    },
    {
      title: 'Booking',
      path: '#',
    },
    {
      title: 'Contact Us',
      path: '#',
    },
    {
      title: 'Blogs',
      path: '#',
    },
  ];

  const helpCenter: LinkItem[] = [
    {
      title: 'Find a Property',
      path: '#',
    },
    {
      title: 'How To Host',
      path: '#',
    },
    {
      title: 'Why Us',
      path: '#',
    },
    {
      title: 'FAQs',
      path: '#',
    },
    {
      title: 'Rental Guids',
      path: '#',
    },
  ];

  const blogs: LinkItem[] = [
    {
      title: 'Lorem Ipsum',
      path: '#',
    },
    {
      title: 'Dolor Sit',
      path: '#',
    },
    {
      title: 'Magna Aliqua',
      path: '#',
    },
    {
      title: 'LDuis Aute',
      path: '#',
    },
    {
      title: 'Lorem Ipsum',
      path: '#',
    },
  ];

  return (
    <footer className="bg-white text-black font-montserrat">
      <div className="md:container mx-auto px-10 lg:px-32 py-20 w-full flex flex-col gap-12">
        <div className="grid grid-cols-2 gap-y-10 gap-x-10 md:gap-0 md:grid-cols-4 justify-items-center">
          <div className="w-full flex flex-col lg:pl-16">
            <h3 className="text-base md:text-lg font-bold mb-6">FIND</h3>
            <UI data={find} />
          </div>

          <div className="w-full flex flex-col lg:pl-16">
            <h3 className="text-base md:text-lg font-bold mb-6">COMPANY</h3>
            <UI data={company} />
          </div>

          <div className="w-full flex flex-col lg:pl-16">
            <h3 className="text-base md:text-lg font-bold mb-6">HELP CENTER</h3>
            <UI data={helpCenter} />
          </div>

          <div className="w-full flex flex-col lg:pl-16">
            <h3 className="text-base md:text-lg font-bold mb-6">BLOGS</h3>
            <UI data={blogs} />
          </div>
        </div>
      </div>

      <div className="md:container mx-auto px-4 md:px-1 py-8 md:flex items-center justify-between border-t-2 border-gray-400">
        <div className="flex flex-col md:flex-row">
          <h4 className="text-sm md:text-base text-center font-semibold mb-2 md:mb-0">
            &copy; 2023 Bloonsoo | All rights reserved
          </h4>
          <h4 className="text-sm md:text-base text-center font-semibold mb-5 md:mb-0 mx-1 text-blue-700">
            Powered by Marriextransfer Private Limited
          </h4>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <a href="#">
            <FontAwesomeIcon icon={faSquareFacebook} className="text-blue-700 text-lg md:text-2xl" />
          </a>

          <a href="#">
            <FontAwesomeIcon icon={faTwitter} className="text-blue-700 text-lg md:text-2xl" />
          </a>

          <a href="#">
            <FontAwesomeIcon icon={faInstagram} className="text-blue-700 text-lg md:text-2xl" />
          </a>

          <a href="#">
            <FontAwesomeIcon icon={faLinkedin} className="text-blue-700 text-lg md:text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
