import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo.png'
import Flats from './icons/Flats'
import Room from './icons/Room'
import Flight from './icons/Flight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faHotel  } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'



interface NavbarProps {
  short?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ short }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router= useRouter()

  let user: any

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const userJson = localStorage.getItem('user');
             user = userJson ? JSON.parse(userJson) : null;
        }
        if (user) {
          setIsLoggedIn(true);
        }
      }, []);


  const containerClasses = classNames('relative', 'mx-auto', 'flex', 'flex-col', 'justify-center', 'sm:container', 'px-20', {
    'h-32': short,
    'h-44': !short,
  });

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')

    setTimeout(() => {
        window.location.reload();
      }, 1000); 
    

  }
  
  return (
    <nav className='py-8 bg-darkblue text-white font-montserrat'>
        <div className='px-4 flex items-center justify-between relative md:px-2 md:container md:mx-auto'>
          <Link href='/'>
            <Image src={Logo}  width='255' height='255' alt='logo'/>
          </Link>

          <div className="flex gap-5">

            <div className="flex gap-2">
                {isLoggedIn ? (
                <Link href='/listing' className="py-2 px-3 md:py-2 md:px-6 rounded-full gradient-btn">Become A Host</Link>

                ): null}

                {/* <button 
                @click="toggleMenu"
                className="flex gap-3 rounded-full px-1 bg-white items-center justify-between">
                    <font-awesome-icon v-if="!menu" icon="fa-solid fa-bars" 
                    className="text-blue-700 ml-3"/>

                    <font-awesome-icon v-if="menu" icon="fa-solid fa-times" 
                    className="text-blue-700 text-xl ml-3"/>

                    <div className="bg-blue-700 w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
                        <font-awesome-icon
                        v-if="!user"
                        icon="fa-solid fa-user" className="text-white"/>

                        <img 
                        v-if="user && user.profilePic"
                            :src="user.profilePic"
                            className="w-full h-full object-cover"
                            alt=""
                        />

                        <div 
                        v-if="user && !user.profilePic"
                        className="flex items-center justify-center text-white w-full h-full">
                            <h1 className="font-bold text-sm">{{ getInitials }}</h1>
                        </div>
                    </div>
                </button> */}
            </div>
            
            {isLoggedIn ? (
                <button className='btn-accent py-2 px-6' onClick={handleLogout}>Logout</button>
            ) :(
                <div  className="flex gap-2 text-white font-semibold">
                <Link className="px-6 py-2 gradient-outline-btn" href='/signin'>Login</Link>
    
                <Link className="px-6 py-2 gradient-outline-btn" href='/register'>Register</Link>
                
                </div>
            )}

            

            </div>
        </div>

        <div className="hidden md:block">
            <div className="px-4 mt-6 font-normal md:flex space-x-2 items-center justify-start sm:px-2 sm:container sm:mx-auto">
                <Link href="/" className="flex py-2 px-4 rounded-full border-2 border-white gap-2 items-center justify-center">
                    <FontAwesomeIcon icon={faHotel} className="w-4 h-4" />
                    <span className="text-sm">Hotels</span>
                </Link>

                <Link href="/coming_soon" className="flex py-2 px-4 rounded-full border-white gap-2 items-center justify-center">
                    <Flight/>
                    <span className="text-sm">Flights</span>
                </Link> 
                
                <Link href="/coming_soon" className="flex py-2 px-4 rounded-full border-white gap-2 items-center justify-center">
                    <Room/>
                    <span className="text-sm">Rooms</span>
                </Link>

                <Link href="/coming_soon" className="flex py-2 px-4 rounded-full border-white gap-2 items-center justify-center">
                    <Flats/>
                    <span className="text-sm">Flats</span>
                </Link>

                <Link href="/coming_soon" className="flex py-2 px-4 rounded-full border-white gap-2 items-center justify-center">
                    <FontAwesomeIcon icon={faHouseChimney} className="w-4 h-4" />
                    <span className="text-sm">Villas</span>
                </Link>

            </div> 
        </div>

        <div  className={containerClasses}>
            <h1 className="text-2xl md:text-3xl font-bold">
                Find your next stay
            </h1>

            <p className="mt-3 text-sm font-normal">
                Search low prices on hotels, homes and much more...
            </p>
        </div>
    </nav>
  )
}

Navbar.propTypes = {
  short: PropTypes.bool,
};


export default Navbar