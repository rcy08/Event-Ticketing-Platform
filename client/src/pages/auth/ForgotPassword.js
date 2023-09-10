
import { useState } from 'react';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        setErrors({});
        setStatus();

        const response = await fetch('https://ticketvibe-server.cyclic.app/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if(data.errors){
            setErrors(data.errors);
        }
        else{
            setStatus(data.message);
            setErrors({});
            setEmail('');
        }
    }

    return (

        <div className="container bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
            
            <div className="forgotpassword">

            <form className='rounded' onSubmit={handleSubmit}>

                <h1> Forgot Password </h1>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        <div className='peer-focus:font-medium text-xs text-red-500'> {errors.email} </div>
                    </div>

                    <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-28">Submit</button>

                    {!status && <h3 className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Back to <a href="/auth/signin" className="text-blue-600 dark:text-blue-500"> Signin </a> </h3>}

                    {status && <div className='font-bold text-base text-green-500 mt-4'> {status} </div>}
                    
            </form>

            </div>

        </div>
    );
}
 
export default ForgotPassword;