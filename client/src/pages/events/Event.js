
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
        
        <div className="single-event bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."> 

            {event && 

                <div className='w-full flex flex-col items-center justify-evenly'> 
                    <Carousel slideInterval={3000} className='w-3/4 h-96 mt-8'>
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

                            
                    <Card
                        imgAlt=""
                        imgSrc="/images/blog/image-1.jpg"
                        className='w-1/4 flex items-center justify-center'
                    >
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <p> {event.title} </p> 
                        </h5>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            <p> Starts on {event.start} </p> 
                        </h5>
                        <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                            <p> Ends on {event.end} </p> 
                        </h5>
                        <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                            <p> Registration Starts on {event.reg_start} </p>
                        </h5>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            <p> Registration Ends on {event.reg_end} </p> 
                        </h5>
                        <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                            <p> Venue - {event.venue} </p> 
                        </h5>
                        <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                            <p> Description - {event.description} </p> 
                        </h5>      

                        <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={handleBook}> <a href='/'> Book a Ticket </a> </button> 
                            
                    </Card>

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