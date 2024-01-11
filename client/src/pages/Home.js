import { Carousel } from 'flowbite-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa";
import { useLoadingContext } from '../hooks/useLoadingContext';

import img1 from '../images/img1.jpg'; 
import img2 from '../images/img2.jpg'; 
import img3 from '../images/img3.jpg'; 
import img4 from '../images/img4.jpg'; 
import img5 from '../images/img5.png'; 

const images = [
    {
        id: 1,
        src: img1,
        alt: "Image1"
    },
    {
        id: 2,
        src: img2,
        alt: "Image2"
    },
    {
        id: 3,
        src: img3,
        alt: "Image3"
    },
    {
        id: 4,
        src: img4,
        alt: "Image4"
    },
    {
        id: 5,
        src: img5,
        alt: "Image5"
    },
];

const Home = () => {

    const navigate = useNavigate();
    const { loadingDispatch } = useLoadingContext();

    useEffect(() => {
        loadingDispatch({ type: 'RESET' });
    }, []);

    return (

        <div className='flex flex-row justify-center'>
        
        <div className="w-full max-w-[2000px] h-full mb-0 ">

            <div className='mt-32 sm:mt-44 md:mt-60 lg:mt-32 xl:mt-24 mx-[20px] min-[500px]:mx-[50px] sm:mx-8 xl:mx-16 2xl:mx-24 min-h-[70vh] sm:min-h-[100vh] text-left grid grid-cols-1 xl:grid-cols-2 gap-4 '>

                <div className='w-fit h-fit mt-8 lg:mt-20 2xl:mt-16' >
                    <div className='min-[350px]:text-[38px] min-[375px]:text-[40px] min-[450px]:text-[45px] sm:text-[48px] md:text-[52px] font-bold leading-[150%] '> <div className='md:flex lg:block gap-4'> <p className='head-black'> Online </p> <p className=' text-[45px] sm:text-[54px] md:text-[60px] head-blue'> Event Booking </p> </div> <p className='head-black'> now made simple </p> </div>  

                    <div className='bg-[#0015ff] w-fit h-fit mt-20 rounded hover:shadow-lg hover:shadow-[#cacaca]'>
                        <Link to='/events' className='w-fit h-fit' >
                            <motion.button
                                className='bg-orange-500 text-lg text-white px-4 py-4 font-semibold rounded hover:text-white hover:border-2'
                                whileHover={{
                                    x: 1.5,
                                    y: -1.5,
                                }}
                            > 
                                <div className='flex justify-center items-center gap-3'> <p className='head-white'> Book Your Next Event </p>  <FaArrowRight /> </div>  
                            </motion.button>   
                        </Link>
                    </div> 
                </div>
                
                <div className='lg:flex lg:justify-end lg:items-start xl:justify-start 2xl:justify-end 2xl:items-start w-full mt-[40px] min-[550px]:mt-16 h-[250px] min-[500px]:h-[400px] sm:h-[500px] lg:h-[700px] xl:h-[60%] xl:mt-0 2xl:mt-16 ' >
                    <Carousel slideInterval={3000} className='' id='home-carousel'>

                        {
                            images.map(image => (
                                <img key={image.id} src={image.src} alt={image.alt} />
                            ))
                        }

                    </Carousel>
                </div>

            </div>

        </div>

        </div>

    );
}
 
export default Home;