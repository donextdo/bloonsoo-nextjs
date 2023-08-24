import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo.png'
import Flats from './icons/Flats'
import Room from './icons/Room'
import Flight from './icons/Flight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faHotel, faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'
import Currency from '../Currency/Currency'



interface NavbarProps {
    short?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ short }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter()
    const [selected, setSelected] = useState(1)
    const [menu, setMenu] = useState(false);
    const [userEmail, setUserEmail] = useState<any>(null);
    const [isOpenCurrency, setIsOpenCurrency] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("EUR")


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


    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            const email = JSON.parse(storedEmail);
            setUserEmail(email);
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

    const handleClick = (id: any) => {
        setSelected(id)
    }


    const toggleMenu = () => {
        setMenu(!menu);
    };

    let initials: any
    if (userEmail) {
        initials = userEmail?.charAt(0).toUpperCase()
    }
    return (
        <nav className='py-8 bg-darkblue text-white font-montserrat'>
            <div className='px-4 flex items-center justify-between relative md:px-2 md:container md:mx-auto'>
                <Link href='/'>
                    <Image src={Logo} width='255' height='255' alt='logo' />
                </Link>

                <div className="flex gap-5">

                    <div className="flex items-center gap-2">

                    <div
                            className="relative flex flex-col items-center"
                            onMouseEnter={() => setIsOpenCurrency(true)}
                            onMouseLeave={() => setIsOpenCurrency(false)}
                        >
                            <button className=" text-xs py-3 px-3  md:px-6 bg-white text-black rounded-full border-2 border-[#1d4ed8]">{selectedCurrency}</button>

                            {isOpenCurrency && <Currency setSelectedCurrency={setSelectedCurrency}/>}

                        </div>

                        {isLoggedIn ? (
                            <div className='flex gap-2'>
                                <Link href='/listing' className="py-2 px-3 md:py-2 md:px-6 rounded-full gradient-btn">Become A Host</Link>
                                {/* <Link href='/wishlist' className="py-2 px-3 md:py-2 md:px-6 rounded-full ">Wishlist</Link> */}

                            </div>

                        ) : null}

                        

                        <button
                            onClick={toggleMenu}
                            className="flex gap-3 rounded-full px-1 bg-white items-center justify-between py-1"
                        >
                            {!menu ? (
                                <FontAwesomeIcon icon={faBars} className="text-blue-700 ml-3" />
                            ) : (
                                <FontAwesomeIcon icon={faTimes} className="text-blue-700 text-xl ml-3" />
                            )}

                            <div className="bg-blue-700 w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
                                {!isLoggedIn ? (
                                    <FontAwesomeIcon icon={faUser} className="text-white" />
                                )
                                    // : user.profilePic ? (
                                    //     <img
                                    //         src={user.profilePic}
                                    //         className="w-full h-full object-cover"
                                    //         alt=""
                                    //     />
                                    // )
                                    : (
                                        <div className="flex items-center justify-center text-white w-full h-full">
                                            <h1 className="font-bold text-sm">{initials}</h1>
                                        </div>
                                    )}
                            </div>
                        </button>

                       
                    </div>

                    {/* {isLoggedIn ? (
                        // <button className='btn-accent py-2 px-6' onClick={handleLogout}>Logout</button>
                        <div>hi</div>
                    ) : (
                        <div className="flex gap-2 text-white font-semibold">
                            <Link className="px-6 py-2 gradient-outline-btn" href='/signin'>Login</Link>

                            <Link className="px-6 py-2 gradient-outline-btn" href='/register'>Register</Link>

                        </div>
                    )} */}



                </div>
                <div
                    className={`bg-white px-6 py-4 rounded-md w-56 absolute right-6 top-12 z-30 shadow-md 
                        transition-all duration-300 origin-top ${menu ? 'scale-y-100' : 'scale-y-0'}`}
                >
                    <ul className="w-full flex flex-col gap-2 text-sm font-semibold text-gray-600">
                        
                        {isLoggedIn && (
                            <li className="w-full border-b border-gray-300 py-1">
                                <Link href="/wishlist">Wishlist</Link>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className="w-full border-b border-gray-300 py-1">
                                <Link href="/account">Account</Link>
                            </li>
                        )}

                        {/* <li className="w-full border-b border-gray-300 py-1">
                        <Link href="#">About us</Link>
                        </li> */}

                        {isLoggedIn ? (
                            <li className="w-full border-b border-gray-300 py-1">
                                <button className='btn-accent py-2 px-6' onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            <div className='flex flex-col'>
                                <div className='mt-1'>
                                    <Link className="px-6 py-2  bg-[#feaa0f] rounded-full" href='/signin'>Login</Link>
                                </div>

                                <div className='mt-5'>
                                    <Link className="px-6 py-2 bg-[#feaa0f] rounded-full " href='/register'>Register</Link>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>

            <div className="hidden md:block">
                <div className="px-4 mt-6 font-normal md:flex space-x-2 items-center justify-start sm:px-2 sm:container sm:mx-auto">
                    <Link href="/" className={`flex py-2 px-4 rounded-full  gap-2 items-center justify-center ${selected === 1 ? 'border-2 border-white' : ''}`} onClick={() => handleClick(1)}>
                        <FontAwesomeIcon icon={faHotel} className="w-4 h-4" />
                        <span className="text-sm">Hotels</span>
                    </Link>

                    <Link href="/coming_soon" className={`flex py-2 px-4 rounded-full  gap-2 items-center justify-center ${selected === 2 ? 'border-2 border-white' : ''}`} onClick={() => handleClick(2)}>
                        <Flight />
                        <span className="text-sm">Flights</span>
                    </Link>

                    <Link href="/coming_soon" className={`flex py-2 px-4 rounded-full  gap-2 items-center justify-center ${selected === 3 ? 'border-2 border-white' : ''}`} onClick={() => handleClick(3)}>
                        <Room />
                        <span className="text-sm">Rooms</span>
                    </Link>

                    <Link href="/coming_soon" className={`flex py-2 px-4 rounded-full  gap-2 items-center justify-center ${selected === 4 ? 'border-2 border-white' : ''}`} onClick={() => handleClick(4)}>
                        <Flats />
                        <span className="text-sm">Flats</span>
                    </Link>

                    <Link href="/coming_soon" className={`flex py-2 px-4 rounded-full  gap-2 items-center justify-center ${selected === 5 ? 'border-2 border-white' : ''}`} onClick={() => handleClick(5)}>
                        <FontAwesomeIcon icon={faHouseChimney} className="w-4 h-4" />
                        <span className="text-sm">Villas</span>
                    </Link>

                </div>
            </div>

            <div className={containerClasses}>
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