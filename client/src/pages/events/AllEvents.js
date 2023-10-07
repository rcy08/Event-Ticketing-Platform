
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { useEventContext } from '../../hooks/useEventContext';

const AllEvents = () => {

    const { events, dispatch } = useEventContext();
    const [searchInput, setSearchInput] = useState('');
    const [filterEvents, setFilterEvents] = useState([]);

    useEffect(() => {

        const getEvents = async () => {

            const response = await fetch('https://ticketvibeserver.cyclic.app/events/', {
                method: 'GET',
                headers: { 'Content-Type' : 'application/json' }
            });

            const data = await response.json();

            console.log(data);

            localStorage.setItem('events', JSON.stringify(data));
            dispatch({ type: 'SET_EVENTS', payload: data.events });
        }

        getEvents();

    }, [dispatch]);

    const fetchResults = (data) => {
        const results = events.filter(event => {
            return (data && event && event.title && event.title.toLowerCase().includes(data.toLowerCase()));
        });
        console.log(data, results);
        setFilterEvents(results);
    };

    const handleSearch = (data) => {
        setSearchInput(data);
        console.log(searchInput);
        // console.log(events);
        fetchResults(data);
    };

    return (

        <div className="mt-24 mb-40 ml-4 mr-4">

            <div className='flex flex-row justify-center items-center mb-20'>   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative w-1/3">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full h-12 p-4 pl-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black" placeholder="Search Events" required
                        value={searchInput}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {/* <button type="submit" class="text-white h-8 my-auto absolute right-2.5 bottom-2.5 top-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                </div>
            </div>

            {searchInput && filterEvents.length === 0 && 
                <div className='flex flex-row justify-center items-center mt-40 mb-32'>
                    <h1 className='font-bold text-lg'> No such Event </h1> 
                </div>
            }

            <div className='grid grid-cols-4 gap-4 ml-4 mr-6' >

            {searchInput && filterEvents.map(event => (
                    <div className='hover:shadow-xl hover:shadow-gray-300 m-4' >

                        <Link to={'/event/' + event._id} target='_blank'> 
                            <Card
                                imgAlt=""
                                imgSrc="/images/blog/image-1.jpg"
                            >
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <p> {event.title} </p>
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
                                        <div> Total Registrations - </div> <div className='text-blue-700 mr-4'> x{event.bookedBy.length} </div>
                                    </div>
                                </p>
    
                            </Card>    
                        </Link>
                        
                    </div>
                ))}

                {!searchInput && events && events.map(event => (
                    <div className='hover:shadow-xl hover:shadow-gray-300 m-4' >

                        <Link to={'/event/' + event._id} target='_blank'> 
                            <Card
                                imgAlt=""
                                imgSrc="/images/blog/image-1.jpg"
                            >
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <p> {event.title} </p>
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
                                        <div> Total Registrations - </div> <div className='text-blue-700 mr-4'> x{event.bookedBy.length} </div>
                                    </div>
                                </p>
    
                            </Card>    
                        </Link>
                        
                    </div>
                ))}  

            </div>

        </div>

    );
}
 
export default AllEvents;