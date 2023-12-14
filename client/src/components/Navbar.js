import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { MdLogout } from 'react-icons/md';
import { LuUserCircle2 } from "react-icons/lu";
import { IoIosHome } from "react-icons/io";
import { BiSolidInfoSquare } from "react-icons/bi";
import { MdEvent } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { easeInOut, easeOut, motion, spring } from 'framer-motion';
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const NavbarLinks = [
  {
    id: 1,
    path: '/',
    title: 'Home'
  },
  {
    id: 2,
    path: '/about',
    title: 'About'
  },
  {
    id: 3,
    path: '/events',
    title: 'Events'
  },
  {
    id: 4,
    path: '/events/create',
    title: 'Create Event'
  },
];

const SidebarLinks = [
  {
    path: '/',
    title: 'Home',
    icon: <IoIosHome />
  },
  {
    path: '/about',
    title: 'About',
    icon: <BiSolidInfoSquare />
  },
  {
    path: '/events',
    title: 'Events',
    icon: <MdEvent />
  },
  {
    path: '/events/create',
    title: 'Create Event',
    icon: <IoCreateOutline />
  },
];

const Navbar = () => {
  
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState('');

  const { signedin, user, dispatch } = useAuthContext();

  const handleSignout = async () => {
    localStorage.removeItem('userToken');
    dispatch({ type: 'SIGNOUT' });
    navigate('/');
  }

  useEffect(() => {
    if (signedin) {
      setUserDetails(user.user);
    }
  }, [signedin, user, dispatch]);

  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        // Clicked outside the target element
        setShowProfile(false);
      }
    };

    // Attach the event listener to the document when the component mounts
    document.addEventListener('mousedown', handleClickOutsideProfile);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
    };

  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const [isOpen, setIsOpen] = useState(false);

  window.onscroll = () => {
    setIsOpen(false);
    setShowProfile(false);
  };

  const sheetWidth = (document.body.clientWidth) * (4 / 5);

  const sheetRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideSheet = (event) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target)) {
        // Clicked outside the target element
        setIsOpen(false);
      }
    };

    // Attach the event listener to the document when the component mounts
    document.addEventListener('mousedown', handleClickOutsideSheet);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSheet);
    };

  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const [navAtTop, setNavAtTop] = useState(true);

  const navNotTop = 'fixed top-0 left-0 right-0 z-10 w-full bg-[#1f2937] text-white h-[60px]';
  
  const navTop = 'fixed top-0 left-0 right-0 z-10 w-full bg-transparent text-black h-[60px] border-b-2 border-gray-300';

  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if(window.scrollY > 0){
      setNavAtTop(false);
    }
    else{
      setNavAtTop(true);
    }
  });

  const handleFilter = (sort) => {
    
    window.location.href = (!sort ? `/events` : `/events?sort=${sort}`);

  };

  return (

    <nav className={navAtTop ? navTop : navNotTop} id='navbar' >
      <button 
        className={navAtTop ? 'hidden' : 'fixed bottom-8 right-16 opacity-[70%] '} 
        onClick={() => window.scrollTo(0, 0)}
      > <FaRegArrowAltCircleUp className='w-[300%] h-[300%] bg-black rounded-full' /> </button>

      <div className='w-[100%] h-[100%] flex items-center relative'>
        <h2 className='absolute left-8 sm:left-4 md:left-12 lg:left-24'>
          <Link
            to={'/'}
            className='text-2xl head'
          >
            Ticketvibe
          </Link>
        </h2>

        <ul className='hidden sm:flex mx-auto text-[17px] '>

          {
            NavbarLinks.map(link => (
              <li key={link.id} className='mr-4 md:mr-8 lg:mr-12 hover:text-orange-500' > <Link to={link.path}> {link.title} </Link> </li>
            ))
          }

        </ul>  

        {
          signedin ? 

            <div 
              className='absolute right-16 md:right-10 lg:right-16'         
            > 
              <div className='relative'>
                <button 
                  className='w-8 h-8 flex items-center rounded-full hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white'
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='profile picture' className='w-8 h-8 rounded-full' />
                </button>
                
                {
                  showProfile && 
                  <motion.div 
                    variants={{
                      hidden: {
                        opacity: 0,
                        scale: 0.95
                      },
                      show: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          type: spring,
                          duration: 0.1,
                          ease: easeInOut,
                        }
                      }
                    }} 
                    initial='hidden'
                    animate='show' 
                    ref={profileRef}
                    className='flex flex-col border-[1px] border-t-0 border-gray-300 absolute right-0 top-10 w-[200px] bg-white transition ease-in-out'
                  >
                    <div className='bg-blue-600 w-full h-[5px]'>  </div>

                    <div className='text-black font-semibold text-[16px] h-[50px] flex px-4 items-center text-left'> 
                      {userDetails.username}
                    </div>

                    <div className='text-black h-[40px] flex px-4 items-center hover:bg-[#eeeeee] hover:cursor-pointer text-left'
                      onClick={() => navigate(`/profile/${userDetails.username}`)}
                    > 
                    <LuUserCircle2 className='mr-2 scale-125' /> Profile 
                    </div>
                    
                    <div className='text-black h-[40px] flex px-4 items-center hover:bg-[#eeeeee] hover:cursor-pointer text-left'> My Events </div>
                    <hr className='mt-2' />

                    <button className='text-black h-[40px] flex flex-row items-center px-4 hover:bg-[#eeeeee] hover:cursor-pointer text-left'
                      onClick={handleSignout}
                    >
                      <MdLogout className='scale-110 my-auto' /> 
                      <p className='text-red-500 font-semibold ml-2'> Sign Out </p>
                    </button>

                  </motion.div>
                }  
              </div>
              
            </div>  :  

            <div
              className='absolute right-[28px] sm:right-4 lg:right-20'
            >
              <button
                onClick={() => navigate('/auth/signin')}
                className='mr-2 bg-orange-500 text-white hover:bg-white hover:text-orange-500 border-2 border-[#eeeeee] hover:border-orange-500 rounded font-medium '
              >
                <p className='py-[6px] px-[8px]'> SignIn </p> 
              </button>
              <button
                onClick={() => navigate('/auth/signup')}
                className='mr-4 bg-orange-500 text-white hover:bg-white hover:text-orange-500 border-2 border-[#eeeeee] hover:border-orange-500 rounded font-medium '
              >
                <p className='py-[6px] px-[8px]'> SignUp </p> 
              </button>
            </div>

        }
      
        <div className='sm:hidden absolute right-3'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center'
          > 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-110">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {
          isOpen && 
          <>
            <motion.div
              className=' sm:hidden fixed top-0 left-0 w-[20%] h-full z-20 bg-white '
              variants={{
                hidden: {
                  opacity: 0,
                  x: 350,
                },
                show: {
                  opacity: 0.75,
                  x: 0,
                  transition: {
                    duration: 0.25,
                    type: spring,
                    ease: easeInOut
                  }
                }
              }}
              initial='hidden'
              animate='show'
            >
            </motion.div>

            <motion.div 
              ref={sheetRef}
              className='sm:hidden fixed top-0 right-0 h-full w-[80%] bg-[#1f2937] text-white z-25 p-8 opacity-[100%] '
              variants={{
                hidden: {
                  opacity: 0,
                  x: sheetWidth
                },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.25,
                    type: spring,
                    ease: easeInOut
                  }
                }
              }}
              initial='hidden'
              animate='show'
            >
              <button
                className='fixed top-[16px] right-3 text-white'
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-110">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className='flex flex-col justify-center items-start mt-16 mb-8'>
                {
                  
                  SidebarLinks.map((link, index) => (
                    <motion.a 
                      key={index} 
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: 20
                        },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            type: spring,
                            duration: 0.5,
                            delay: 0.1 * index,
                            ease: easeOut 
                          }
                        }
                      }}
                      initial='hidden'
                      animate='show'
                      href={link.path}
                      className='hover:bg-slate-600 w-full my-2 p-[10px] rounded-md'
                      onClick={() => setIsOpen(false)}
                    >
                      <div className='flex items-center gap-3'> <div className='scale-[130%]'> {link.icon} </div> <p className='text-xl'> {link.title} </p> </div>
                    </motion.a>
                  ))  
                  
                }  
              </div>
              
              <div className='border-2 border-gray-500 my-16 w-full p-2' >
                  <div className='flex items-center gap-[6px] mb-4'> <FaArrowRight /> Filter Events </div> 
                  <div className='flex flex-col items-center h-fit'>

                      <button
                          className='hover:text-blue-600'
                          onClick={() => {
                              setIsOpen(false);
                              handleFilter('registered');
                          }}
                      >
                          <div className='flex items-center justify-center gap-2'> <input type='radio' className='hover:cursor-pointer' /> Sort by Registrations </div> 
                      </button>

                      <button
                          onClick={() => {
                              setIsOpen(false);
                              handleFilter('');
                          }}
                          className='flex-end bg-[#eeeeee] text-black mt-8 p-[2px] px-1 h-fit w-fit'
                      >
                          Reset
                      </button>

                  </div>
                </div>

            </motion.div>

          </>
          
        }

      </div>
    </nav>

  )
}

export default Navbar;


