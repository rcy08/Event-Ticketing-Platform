
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

        <div className="container">

            <div className='flex justify-center items-center' >

                {events && events.map(event => (
                    <div className='hover:shadow hover:shadow-gray-600 m-2'>

                        <Link to={'/event/' + event._id}> 
                            <Card
                                imgAlt="Meaningful alt text for an image that is not purely decorative"
                                imgSrc="/images/blog/image-1.jpg"
                            >
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <p> {event.title} </p>
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a ipsa sed ipsum at doloribus distinctio soluta inventore vel harum, provident fugit assumenda obcaecati, illum quae pariatur vero in molestiae.
                                    </p>
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