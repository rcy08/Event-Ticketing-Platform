import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import NavbarContent from './NavbarContent';
import { easeOut, motion, spring } from 'framer-motion';
import { useLoadingContext } from '../../hooks/useLoadingContext';

const Navbar = ({ isOpen, setIsOpen }) => {
  
  const [navAtTop, setNavAtTop] = useState(true);
  const { loadingDispatch } = useLoadingContext();

  const width = window.screen.width;

  window.addEventListener('scroll', () => {
    if(window.scrollY > 0){
      setNavAtTop(false);
    }
    else{
      setNavAtTop(true);
    }
  });

  let offsetTop;
  let offsetBottom;
  let offsetLeft;
  let offsetRight;

  const element = document.getElementById('navbar');

  if (element) {
    const rect = element.getBoundingClientRect();

    offsetTop = rect.top;
    offsetBottom = rect.bottom;
    offsetLeft = rect.left;
    offsetRight = rect.right;
  }

  return (

    <>

      {
        navAtTop ? 

        <div className='w-full flex flex-row justify-center border-b-2 border-gray-300 bg-transparent text-black'>

          <nav className='z-10 w-full max-w-[2000px] h-[80px] sm:h-[65px]' id='navbar' >

            <NavbarContent isOpen={isOpen} setIsOpen={setIsOpen} navAtTop={navAtTop} />

          </nav> 

        </div>

        :

        <div className={`fixed top-0 left-0 z-10 w-full flex flex-row h-[${width < 640 ? 80 : 65}px] justify-center bg-[#1f2937]`}>

          <motion.nav
            variants={{
              hidden: {
                height: 0
              },
              show: {
                height: (width < 640 ? 80 : 65),
                transition: {
                  type: spring,
                  duration: 0.25,
                  stiffness: 400,
                  ease: easeOut
                }
              }
            }}
            initial='hidden'
            animate='show'
            className={`fixed top-0 left-${offsetLeft} z-10 w-full bg-[#1f2937] max-w-[2000px] text-white`}
          >
            <motion.button 
              variants={{
                hidden: {
                  opacity: 0,
                  x: 50
                },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: spring,
                    duration: 0.5,
                    stiffness: 400,
                    ease: easeOut
                  }
                }
              }}
              initial='hidden'
              animate='show'
              className={navAtTop ? 'hidden' : 'fixed bottom-8 right-16 opacity-[70%]'} 
              onClick={() => window.scrollTo(0, 0)}
            > 
              <FaRegArrowAltCircleUp className='w-[300%] h-[300%] bg-black rounded-full' /> 
            </motion.button>

            <NavbarContent isOpen={isOpen} setIsOpen={setIsOpen} navAtTop={navAtTop} />
            
          </motion.nav>

        </div>

      }

    </>

  )
};

export default Navbar;


