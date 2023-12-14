
import { useState } from 'react';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        setErrors({});
        setStatus();

        const response = await fetch('https://ticketvibeserver.cyclic.app/auth/forgot-password', {
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

        <div className="h-[100vh] flex items-center justify-center mt-12">

            <form className='rounded relative bg-white p-4 sm:p-8 w-[85%] min-[550px]:w-[60%] sm:w-[52%] md:w-[45%] min-[1075px]:w-[32%] xl:w-[27%] 2xl:w-[22%] shadow-2xl shadow-gray-400' onSubmit={handleSubmit}>

                <h1 className='text-center text-2xl font-semibold mb-6'> Forgot Password </h1>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        <div className='peer-focus:font-medium text-xs text-red-500'> {errors.email} </div>
                    </div>

                    <div className='flex justify-center'>
                        <button className="w-[110px] text-white border-2 border-[#eeeeee] bg-orange-500 hover:bg-white hover:text-orange-500 hover:border-orange-500 rounded-sm font-semibold text-[15px] px-5 py-[10px] text-center mb-4">Submit</button>    
                    </div>
                    
                    {!status && <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300"> Back to <a href="/auth/signin" className="text-blue-600 dark:text-blue-500 ml-1"> Signin </a> </h3>}

                    {status && <div className='font-bold text-base text-green-500 mt-4'> {status} </div>}
                    
            </form>

        </div>
    );
}
 
export default ForgotPassword;