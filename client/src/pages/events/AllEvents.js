
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { useEventContext } from '../../hooks/useEventContext';
import { IoOptionsOutline } from "react-icons/io5";
import { animate, easeInOut, easeOut, motion, spring } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import loader from '../../images/loading2.gif';

const AllEvents = () => {

    const { events, dispatch } = useEventContext();
    const [filterEvents, setFilterEvents] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const getEvents = async () => {

            const response = await fetch('https://ticketvibeserver.cyclic.app/events/', {
                method: 'GET',
                headers: { 'Content-Type' : 'application/json' }
            });
    
            const data = await response.json();
            // console.log(data);
            setFilterEvents(data.events);
    
            localStorage.setItem('events', JSON.stringify(data));
            dispatch({ type: 'SET_EVENTS', payload: data.events });
        }

        getEvents();

    }, [dispatch]);

    const [searchParams, setSearchParams] = useSearchParams();

    const searchInput = searchParams.get('search') || '';
    const sortInput = searchParams.get('sort') || '';

    const fetchResults = (data) => {
        const results = events.filter(event => {
            return (data && event && event.title && event.title.toLowerCase().includes(data.toLowerCase()));
        });
        console.log(data, results);
        setFilterEvents(results);
    };

    const fetchSortResults = (sort) => {
        if(sort === ''){
            window.location.reload(); return;
        } 
        filterEvents.sort((x, y) => {
            if(sort === 'registered'){
                if(x.bookedBy.length < y.bookedBy.length) return 1;
                else if(x.bookedBy.length > y.bookedBy.length) return -1;
                else return 0;
            }
        });
    };

    const handleSearch = (search) => {
        if(search){
            if(searchParams.get('sort')) setSearchParams({ search, sort: searchParams.get('sort') });
            else setSearchParams({ search });
        }
        else{
            if(searchParams.get('sort')) setSearchParams({ sort: searchParams.get('sort') });
            else setSearchParams({});
        }
        fetchResults(search);
    };

    const handleFilter = (sort) => {
        if(sort){
            if(searchParams.get('search')) setSearchParams({ search: searchParams.get('search'), sort });
            else setSearchParams({ sort });
        }
        else{
            if(searchParams.get('search')) setSearchParams({ search: searchParams.get('search') });
            else setSearchParams({});
        }
        fetchSortResults(sort);
    };

    useEffect(() => {
        if(events){
            if(searchInput) handleSearch(searchInput);
            if(sortInput) handleFilter(sortInput);
        } 
    }, [events]);

    window.onscroll = () => {
        setShowFilter(false);
    }

    const FilterRef = useRef(null);

    useEffect(() => {
        const handleClickOutsideFilter = (event) => {
          if (FilterRef.current && !FilterRef.current.contains(event.target)) {
            // Clicked outside the target element
            setShowFilter(false);
          }
        };
    
        // Attach the event listener to the document when the component mounts
        document.addEventListener('mousedown', handleClickOutsideFilter);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleClickOutsideFilter);
        };
    
    }, []); // Empty dependency array ensures the effect runs once when the component mounts

    const notify = () => {
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }; 

    return (

        <div className="mt-28 sm:mt-40 lg:mt-44 mb-24 sm:mb-40 mx-[40px] md:mx-[50px] lg:mx-[60px] ">

            <div className='flex flex-row justify-center items-center mb-12 sm:mb-20'>   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative w-full sm:w-2/3 xl:w-1/3">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-blue-500 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search" id="default-search" class="block w-full h-12 p-4 pl-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black hover:shadow-lg hover:shadow-gray-300" placeholder="Search Events" required
                        value={searchInput}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button 
                        className='hidden sm:flex absolute inset-y-0 right-4 items-center'
                        onClick={() => setShowFilter(!showFilter)}
                    > 
                        <IoOptionsOutline className='scale-125'/>
                    </button>
                    {/* <button type="submit" class="text-white h-8 my-auto absolute right-2.5 bottom-2.5 top-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                </div>
            </div>

            {
                !events ? <img src={loader} alt='Loading...' /> :

            <div>

            {searchInput && (!filterEvents || filterEvents.length === 0) && 
                <div className='flex flex-row justify-center items-center mt-40 mb-32'>
                    <h1 className='font-bold text-lg'> No such Event </h1> 
                </div>
            }

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 md:gap-[27px] lg:gap-[32px] ' >

                {searchInput && filterEvents && filterEvents.map((event, index) => (
                    <motion.div 
                        className='hover:shadow-2xl hover:shadow-gray-300' 
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 100
                            },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    type: spring,
                                    duration: 1,
                                    delay: 0.15 * index,
                                    ease: easeInOut
                                }
                            }
                        }}
                        initial='hidden'
                        animate='show'
                    >

                        <Link to={`/event/${event._id}`} target='_blank'> 
                            <Card
                                imgAlt=""
                                imgSrc="/images/blog/image-1.jpg"
                            >
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between">
                                    <p> {event.title} </p>
                                    <button 
                                        className='w-8 h-8 border-[1px] border-black rounded-full flex items-center justify-center bg-[#eeeeee]'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            notify();
                                            navigator.clipboard.writeText(`/event/${event._id}`);
                                        }}
                                    > 
                                        <div className='text-[16px] '>
                                            <ToastContainer
                                                position="top-right"
                                                autoClose={5000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                                theme="light"
                                            />    
                                        </div>
                                        
                                        <IoArrowRedoSharp /> 
                                    </button> 
                                </h5>
                                <p className="font-extrabold text-orange-500 dark:text-gray-400">
                                    <p>
                                        Starts on {event.start}
                                    </p>
                                </p>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a ipsa sed ipsum at doloribus distinctio
                                    </p>
                                </p>
                                <p className="font-medium text-gray-700 dark:text-gray-400">
                                    <p>
                                        {event.venue}
                                    </p>
                                </p>
                                <p className="font-medium text-gray-700 dark:text-gray-400">
                                    <p>
                                        Registration ends on {event.reg_end}
                                    </p>
                                </p>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <div className='flex flex-row justify-between'> 
                                        <div> Total Registrations - </div> <div className='text-blue-600 mr-4 font-semibold'> x{event.bookedBy.length} </div>
                                    </div>
                                </p>

                            </Card>    
                        </Link>

                    </motion.div>
                ))}

                {!searchInput && events && events.map((event, index) => (
                    <motion.div 
                        className='hover:shadow-xl hover:shadow-gray-300'
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 100
                            },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    type: spring,
                                    duration: 1,
                                    delay: 0.15 * index,
                                    ease: easeInOut
                                }
                            }
                        }}
                        initial='hidden'
                        animate='show' 
                    >

                        <Link to={`/event/${event._id}`} target='_blank'> 
                            <Card
                                imgAlt=""
                                imgSrc="/images/blog/image-1.jpg"
                            >
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between">
                                    <p> {event.title} </p>
                                    <button 
                                        className='w-8 h-8 border-[1px] border-black rounded-full flex items-center justify-center bg-[#eeeeee]'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            notify();
                                            navigator.clipboard.writeText(`/event/${event._id}`);
                                        }}
                                    > 
                                        <div className='text-[16px] '>
                                            <ToastContainer
                                                position="top-right"
                                                autoClose={5000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                                theme="light"
                                            />    
                                        </div>
                                        
                                        <IoArrowRedoSharp /> 
                                    </button> 
                                </h5>
                                <p className="font-bold text-orange-500 dark:text-gray-400">
                                    <p>
                                        Starts on {event.start}
                                    </p>
                                </p>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a ipsa sed ipsum at doloribus distinctio
                                    </p>
                                </p>
                                <p className="font-medium text-gray-700 dark:text-gray-400">
                                    <p>
                                        {event.venue}
                                    </p>
                                </p>
                                <p className="font-medium text-gray-700 dark:text-gray-400">
                                    <p>
                                        Registration ends on {event.reg_end}
                                    </p>
                                </p>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <div className='flex flex-row justify-between'> 
                                        <div> Total Registrations - </div> <div className='text-blue-600 mr-4 font-semibold'> x{event.bookedBy.length} </div>
                                    </div>
                                </p>
    
                            </Card>    
                        </Link>
                        
                    </motion.div>
                ))}  

            </div>

            {
                showFilter && 

                <>
                    <motion.div 
                        className='fixed top-0 left-0 h-full z-20 w-[55%] md:w-[60%] lg:w-[65%] xl:[75%] 2xl:w-[80%] bg-white'
                        variants={{
                            hidden: {
                                opacity: 0,
                                x: 150
                            },
                            show: {
                                opacity: 0.75,
                                x: 0,
                                transition: {
                                    duration: 0.25,
                                    type: 'tween',
                                    ease: [0.17, 0.67, 0.83, 0.67]
                                }
                            }
                        }}
                        initial='hidden'
                        animate='show'
                    >
                    </motion.div>
                    
                    <motion.div 
                        variants={{
                            hidden: {
                                opacity: 0,
                                x: 150
                            },
                            show: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 0.25,
                                    type: 'tween',
                                    ease: [0.17, 0.67, 0.83, 0.67]
                                }
                            }
                        }}
                        initial='hidden'
                        animate='show'
                        ref={FilterRef}
                        id='FilterSheet'
                        className='fixed top-0 right-0 h-full z-30 w-[45%] md:w-[40%] lg:w-[35%] xl:[25%] 2xl:w-[20%] bg-[#1f2937] text-white  p-8'
                    >
                        <button
                            className='fixed top-[16px] right-3 text-white rounded-full border-2 border-gray-500 p-1 '
                            onClick={() => setShowFilter(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"     className="w-6 h-6 scale-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className='border-2 border-gray-500 my-16 w-full p-2' >
                            <div className='flex items-center gap-[6px] mb-4'> <FaArrowRight /> Filter Events </div> 
                            <div className='flex flex-col items-center h-fit'>
                                <button
                                    className='hover:text-blue-600'
                                    onClick={() => {
                                        setShowFilter(false);
                                        handleFilter('registered');
                                    }}
                                >
                                    <div className='flex items-center justify-center gap-2'> <input type='radio' className='hover:cursor-pointer' /> Sort by Registrations </div> 
                                </button>
                                <button
                                    onClick={() => {
                                        setShowFilter(false);
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
            
            }

        </div>

    );
}
 
export default AllEvents;