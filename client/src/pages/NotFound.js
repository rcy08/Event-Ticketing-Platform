import React from 'react';
import Error from '../images/404.gif';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <div className="h-[100vh] w-full bg-[#f1f5f9] flex flex-col items-center justify-center mt-12">
            <img src={Error} alt='Error 404 Not Found.' className='w-full sm:w-1/2 mb-8' />
            <Link to='/' >
                <button className='bg-orange-500 text-white hover:bg-white hover:text-orange-500 border-2 border-[#eeeeee] hover:border-orange-500 rounded font-medium p-2'> Back to Home </button>    
            </Link>
        </div>
    );
}
 
export default NotFound;