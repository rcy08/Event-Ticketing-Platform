
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const { resetToken } = useParams();

    const handleSubmit = async (e) => {

        e.preventDefault();

        setErrors({});
        setStatus('');

        if (password.length >= 6 && password === confirmpassword) {

            const response = await fetch(`https://ticketvibeserver.cyclic.app/auth/reset-password/${resetToken}`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if(data.errors){
                setErrors(data.errors);
            }
            else{
                setStatus(data.message);
                setErrors({});
                setPassword('');
                setConfirmPassword('');
                navigate('/auth/signin');
            }    

        }
        else {
            if(password.length < 6){
                setErrors({
                    password: 'Minimum length of Password is 6 characters'
                });
            }
            else{
                setErrors({
                    confirmpassword: `Passwords don't match`
                });
            }
        }
    }

    return (

        <div className="container bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">

            <div className="resetpassword">

            <form className='rounded' onSubmit={handleSubmit}>

                <h1> Reset Password </h1>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        <div className='peer-focus:font-medium text-xs text-red-500'> {errors.password} </div>
                    </div>
                    
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                        <div className='peer-focus:font-medium text-xs text-red-500'> {errors.confirmpassword} </div>
                    </div>

                    {!status && <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-28">Submit</button> }
                    
                    {status && <div className='font-bold text-base text-green-500 mt-4'> {status} </div> }

                    {errors.token && <div className='font-bold text-base text-red-500 mt-4'> {errors.token} </div>}

            </form>

            </div>

        </div>
    );
}
 
export default ResetPassword;