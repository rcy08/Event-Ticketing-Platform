
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { useEventContext } from '../../hooks/useEventContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const AllEvents = () => {

    const { events, dispatch } = useEventContext();
    const { signedin, user } = useAuthContext();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (signedin) {
          setUserDetails(user.user);
        }
    }, [signedin, user]);

    const handleBook = async (e) => {
        e.preventDefault();

        if (!signedin) {
            navigate('/auth/signin');
            return;
        }

        // console.log(userDetails._id);
        const user_id = userDetails._id;
        const response = await fetch(`https://ticketvibeserver.cyclic.app/events/book-event/${id}/${user_id}`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' }
        });

        const data = await response.json();

        if (data.errors) {
            
        }
        else {
            alert('Event Ticket Booked Successfully');
        }

    }


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
                                <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={handleBook}> <a href='/'> Book a Ticket </a> </button> 
                            </Card>    
                        </Link>
                        
                    </div>
                ))}  

            </div>

        </div>

    );
}
 
export default AllEvents;