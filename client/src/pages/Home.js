import { Carousel } from 'flowbite-react';

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa";

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

    return (
        
        <div className="w-full h-full mb-0 ">

            <div className='mt-32 sm:mt-44 md:mt-60 lg:mt-48 xl:mt-[18vh] 2xl:mt-[20vh] mx-[20px] min-[500px]:mx-[50px] sm:mx-24 min-h-[70vh] sm:min-h-[100vh] text-left grid grid-cols-1 xl:grid-cols-2 gap-4 '>

                <div className='w-fit h-fit mt-8 lg:mt-20 2xl:mt-16' >
                    <div className='min-[350px]:text-[38px] min-[375px]:text-[40px] min-[450px]:text-[45px] sm:text-[48px] md:text-[52px] font-bold leading-[150%] '> <div className='md:flex lg:block gap-4'> Online <p className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 text-[45px] sm:text-[54px] md:text-[60px] '> Event Booking </p> </div>  now made simple </div>  

                    <div className='bg-blue-500 w-fit h-fit mt-20 rounded'>
                        <Link to='/events' className='w-fit h-fit' >
                            <motion.button
                                className='bg-orange-500 text-lg text-white px-4 py-4 font-semibold rounded hover:bg-white hover:text-orange-500 hover:border-2'
                                whileHover={{
                                    x: 3,
                                    y: -3,
                                }}
                            > 
                                <div className='flex justify-center items-center gap-3'> Book Your Next Event <FaArrowRight /> </div>  
                            </motion.button>   
                        </Link>
                    </div> 
                </div>
                
                <div className='lg:flex lg:justify-end lg:items-start xl:justify-start 2xl:justify-end 2xl:items-start w-full mt-[40px] min-[550px]:mt-16 h-[350px] min-[500px]:h-[400px] sm:h-[500px] lg:h-[700px] xl:h-[60%]       xl:mt-0 2xl:mt-16 ' >
                    <Carousel slideInterval={3000} className=''>

                        {
                            images.map(image => (
                                <img key={image.id} src={image.src} alt={image.alt} />
                            ))
                        }

                    </Carousel>
                </div>

            </div>

        </div>

    );
}
 
export default Home;