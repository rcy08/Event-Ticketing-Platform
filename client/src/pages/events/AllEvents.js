
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { useEventContext } from '../../hooks/useEventContext';

const AllEvents = () => {

    const { events, dispatch } = useEventContext();

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

    return (

        <div className="mt-36 mb-40 ml-4 mr-4">

            <div className='grid grid-cols-4 gap-4 ml-4 mr-6' >

                {events && events.map(event => (
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