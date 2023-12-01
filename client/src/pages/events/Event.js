
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Carousel, Card } from 'flowbite-react'; 
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEventContext } from '../../hooks/useEventContext';

const Event = () => {

    const [event, setEvent] = useState('');
    const [errors, setErrors] = useState('');
    const [userDetails, setUserDetails] = useState('');
    const navigate = useNavigate();

    const { id } = useParams();

    const { events, dispatch } = useEventContext();
    const { signedin, user } = useAuthContext();

    useEffect(() => {

        if (events) {
            const selectedEvent = events.filter((e) => {
                return e._id === id;
            });
    
            if (selectedEvent.length > 0) setEvent(selectedEvent[0]);
            else {
                setErrors(`The event you are looking for doesn't exist :/. Make Sure the URL is correct`);
            }
        }

    }, [events, dispatch, id]);

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
        
        <div className="mb-40 mx-[40px] md:mx-0"> 

            {event && 

                <div className='w-full flex flex-col items-center justify-evenly'> 
                    <Carousel slideInterval={3000} className='w-full md:mx-0 sm:w-5/6 md:w-3/4 h-96 mt-12 mb-32'>
                        <img
                            alt="..."
                            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                        />
                        <img
                            alt="..."
                            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                        />
                        <img
                            alt="..."
                            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                        />
                        <img
                            alt="..."
                            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                        />
                        <img
                            alt="..."
                            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                        />
                    </Carousel>   

                    <div className='w-full sm:w-5/6 md:w-3/4 mb-12'>

                        <div className='flex flex-row justify-between mb-12'>
                            <div> <h1 className='text-4xl font-bold'> {event.title} </h1> </div>   
                            <div> <Link> Share Event </Link> </div> 
                        </div> 

                        <div className='flex flex-row justify-between mb-8'>
                            <div> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a ipsa sed ipsum at doloribus distinctio </div> 
                        </div>

                        <div className=''>
                            <div> <h1 className='text-xl font-semibold mb-4'> Date </h1> </div> 
                            <div> <h1 className='font-bold text-orange-500 mb-8'> {event.start} </h1> </div> 
                        </div>

                        <div className=''>
                            <div> <h1 className='text-xl font-semibold mb-4'> Venue </h1> </div> 
                            <div> <h1 className='font-normal text-grey-500 mb-8'> {event.venue} </h1> </div> 
                        </div>

                        <div className=''>
                            <div> <h1 className='text-xl font-semibold mb-4'> Registration </h1> </div> 
                            <div>  <h1 className='font-normal text-grey-500 mb-8'> Ends on {event.reg_end} </h1> </div> 
                        </div>

                        <div className='flex flex-row justify-between mb-20'>
                            <div> <h1 className='text-xl font-semibold mb-4'> Total Registrations </h1> </div>  <div className='font-semibold text-blue-700 mr-4'> x{event.bookedBy.length} </div>   
                            {/* <div> <h1 className='font-normal text-grey-500 mb-20'> Ends on {event.reg_end} </h1> </div>  */}
                        </div>

                        <div className='flex flex-row justify-center'>
                            <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={handleBook}> <a href='/'> Book a Ticket </a> </button> 
                        </div>

                    </div>

                </div>
                  
            }

            {errors && 
                <div className='container'>
                    <div className='font-bold text-3xl'> { errors } </div>
                </div> 
            }
            

        </div>
    );
}
 
export default Event;