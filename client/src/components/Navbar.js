import { useRef, useEffect, useState } from 'react';
import { Dropdown, Navbar, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { MdLogout } from 'react-icons/md';
import { LuUserCircle2 } from "react-icons/lu";
import { IoIosHome } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { easeOut, motion, spring } from 'framer-motion';

const SidebarLinks = [
  {
    path: '/',
    title: 'Home',
    icon: <IoIosHome />
  },
  {
    path: '/',
    title: 'About',
    icon: <IoIosHome />
  },
  {
    path: '/events',
    title: 'Events',
    icon: <MdEvent />
  },
  {
    path: '/events/create',
    title: 'Create Event',
    icon: <MdEvent />
  },
];

export default function NavbarWithDropdown() {

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
  }

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

  return (

    <nav className='flex-start z-10 w-full bg-[#1f2937] text-white h-[60px]'>
      <div className='w-[100%] h-[100%] flex items-center relative'>
        <h2 className='absolute left-8 md:left-12 lg:left-16'>
          <Link
            to={'/'}
            className='font-semibold text-xl'
          >
            Ticketvibe
          </Link>
        </h2>

        <ul className='hidden sm:flex mx-auto '>
          <li className='mr-8 hover:text-slate-300'> <Link to={'/'}> Home </Link> </li>
          <li className='mr-8 hover:text-slate-300'> <Link to={'/'}> About </Link> </li>
          <li className='mr-8 hover:text-slate-300'> <Link to={'/events'}> Events </Link> </li>
          <li className='mr-8 hover:text-slate-300'> <Link to={'/events/create'}> Create Event </Link> </li>
        </ul>  

        {
          signedin ? 

            <div 
              className='absolute right-16 md:right-10 lg:right-16'         
            > 
              <div className='relative'>
                <button 
                  className='w-8 h-8 flex items-center rounded-full hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='profile picture' className='w-8 h-8 rounded-full' />
                </button>
                
                {
                  showProfile && 
                  <motion.div 
                    variants={{
                      hidden: {
                        opacity: 0
                      },
                      show: {
                        opacity: 1,
                        transition: {
                          type: spring,
                          duration: 0.25,
                          ease: easeOut,
                          
                        }
                      }
                    }} 
                    initial='hidden'
                    animate='show' 
                    ref={profileRef}
                    className='flex flex-col border-2 absolute right-0 w-[200px] bg-white rounded-lg transition ease-in-out'
                  >
                    <div className='text-black font-medium h-[50px] flex px-4 items-center text-left'> 
                      {userDetails.username}
                    </div>
                    <div className='text-slate-600 h-[40px] flex px-4 items-center hover:bg-[#eeeeee] hover:cursor-pointer text-left'
                      onClick={() => navigate(`/profile/${userDetails.username}`)}
                    > 
                    <LuUserCircle2 className='mr-2 scale-125' /> Profile 
                    </div>
                    <div className='text-slate-600 h-[40px] flex px-4 items-center hover:bg-[#eeeeee] hover:cursor-pointer text-left'> My Events </div>
                    <hr className='mt-2' />
                    <button className='text-slate-600 h-[40px] flex flex-row items-center px-4 hover:bg-[#eeeeee] hover:cursor-pointer text-left'
                      onClick={handleSignout}
                    >
                      <MdLogout className='scale-110 my-auto' /> 
                      <p className='text-red-600 font-medium ml-2'> Sign Out </p>
                    </button>
                  </motion.div>
                }  
              </div>
              
            </div>  :  

            <div
              className='absolute right-[28px] sm:right-16'
            >
              <button
                onClick={() => navigate('/auth/signin')}
                className='mr-2 hover:bg-slate-600 hover:rounded-lg font-medium '
              >
                <p className='p-[6px] '> SignIn </p> 
              </button>
              <button
                onClick={() => navigate('/auth/signup')}
                className='mr-4 hover:bg-slate-600 hover:rounded-lg font-medium '
              >
                <p className='p-[6px] '> SignUp </p> 
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
          <motion.div 
            ref={sheetRef}
            className='sm:hidden fixed top-0 right-0 h-full w-[80%] bg-[#1f2937] text-white z-20 p-8'
            variants={{
              hidden: {
                opacity: 0,
                x: sheetWidth
              },
              show: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.15,
                  type: spring,
                  ease: easeOut
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
                  <Link 
                    key={index} 
                    to={link.path} 
                    className='hover:bg-slate-600 w-full my-2 p-[10px] rounded-md'
                    onClick={() => setIsOpen(false)}
                  >
                    <div className='flex items-center gap-3'> <div className='scale-[130%]'> {link.icon} </div> <p className='text-xl'> {link.title} </p> </div>
                  </Link>
                ))  
                
              }  
            </div>
            
            <div className='border-2 border-slate-600 p-2 h-[30%]'>
              <h2 className='text-xl'> <div className='flex items-center gap-2'> <IoArrowForward className='scale-110'/> Filter Events </div></h2>

              

            </div>

          </motion.div>
        }

      </div>
    </nav>
  )
}


