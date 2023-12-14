
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventContext } from '../../hooks/useEventContext';

const CreateEvent = () => {

    const [title, setTitle] = useState('');
    const [eventstart, setEventStart] = useState('');
    const [eventend, setEventEnd] = useState('');
    const [regstart, setRegStart] = useState('');
    const [regend, setRegEnd] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');

    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const { dispatch } = useEventContext();

    useEffect(() => {

        const user = localStorage.getItem('userToken');

        if (!user) {
            dispatch({ type: 'SIGNOUT' });
            navigate('/auth/signin');
        }

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = JSON.parse(localStorage.getItem('userToken')).token;

        const response = await fetch('https://ticketvibeserver.cyclic.app/events/create', {
            method: 'POST',
            headers: { 
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({ title, start: eventstart, end: eventend, reg_start: regstart, reg_end: regend, venue, description })
        });

        const data = await response.json();

        if (data.errors) {
            setErrors(data.errors);
        }
        else {
            setTitle('');
            setEventStart('');
            setEventEnd('');
            setRegStart('');
            setRegEnd('');
            setVenue('');
            setDescription('');
            setStatus(data.message);

            dispatch({ type: 'CREATE_EVENT', payload: data.event});
            navigate('/events');
        }

    }

    return (
        <div className="h-[100vh] flex items-center justify-center mt-12"> 

            <form className="rounded relative bg-white p-4 md:p-8 w-[85%] min-[550px]:w-[60%] sm:w-[52%] md:w-[50%] min-[1075px]:w-[35%] xl:w-[30%] 2xl:w-[25%] shadow-2xl shadow-gray-400" onSubmit={handleSubmit}>

                <h1 className='text-center text-2xl font-semibold mb-6'> Create Event </h1>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6 mb-5"> 

                    <div className='flex items-center justify-between md:block' >
                        <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400"> Event Start </label>
                        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 pl-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-9 mt-2" placeholder="Date of Birth" 
                            value={eventstart}
                            onChange={(e) => setEventStart(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center justify-between md:block' >
                        <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400"> Event End </label>
                        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 pl-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-9 mt-2" placeholder="Event End" 
                            value={eventend}
                            onChange={(e) => setEventEnd(e.target.value)}
                        />
                    </div>

                </div>

                <div className="grid md:grid-cols-2 md:gap-6 mb-5"> 

                    <div className='flex items-center justify-between md:block' >
                        <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400"> Registration Start </label>
                        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 pl-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-9 mt-2" placeholder="Date of Birth" 
                            value={regstart}
                            onChange={(e) => setRegStart(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center justify-between md:block' >
                        <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400"> Registration End </label>
                        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 pl-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-9 mt-2" placeholder="Date of Birth" 
                            value={regend}
                            onChange={(e) => setRegEnd(e.target.value)}
                        />
                    </div>

                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                    />
                    <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Venue </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <textarea name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Description </label>
                </div>

                <div className='flex justify-center'>
                    <button className="w-[110px] text-white border-2 border-[#eeeeee] bg-orange-500 hover:bg-white hover:text-orange-500 hover:border-orange-500 rounded-sm font-semibold text-[15px] px-5 py-[10px] text-center mb-4">Submit</button>    
                </div>

                {status}
                {errors}

            </form>

        </div>
    );
}
 
export default CreateEvent;