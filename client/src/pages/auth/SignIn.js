
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useAuthContext } from '../../hooks/useAuthContext';

import { motion } from 'framer-motion';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { dispatch } = useAuthContext();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch('https://ticketvibeserver.cyclic.app/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ usernameOrEmail: email, password })
        });

        const data = await response.json();

        if (data.errors) {
            setErrors(data.errors);
        }
        else {
            setErrors({});
            setEmail('');
            setPassword('');

            console.log(data);
            console.log(JSON.stringify(data));

            localStorage.setItem('userToken', JSON.stringify(data));
            dispatch({ type: 'SIGNIN', payload: data });

            navigate('/');
        }
    }

    const handleCredentialResponse = async (response) => {

        /* global google */
    
        var userObject = jwt_decode(response.credential);

        console.log(userObject);
    
        const res = await fetch('https://ticketvibeserver.cyclic.app/auth/google-user/signin', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ userObject, token: response.credential, client_id: '707253678289-0bbj3lbd22h8r8q5bs6d5b2mj7vc2cec.apps.googleusercontent.com',  })
        });

        const data = await res.json();

        if(data.error){
            alert(data.error);
            if(data.error === 'Please signup with Google first') navigate('/auth/signup');
            return;
        }
    
        localStorage.setItem('userToken', JSON.stringify({ token: `Google ${response.credential}` }) );
        dispatch({ type: 'SIGNIN', payload: { token: `Google ${response.credential}`, user: { ...userObject, username: data.user.username} } });
        alert(data.message);
        navigate('/');
    }
          
    useEffect(() => {

        if(google.accounts){
            google.accounts.id.initialize({
                client_id: '707253678289-0bbj3lbd22h8r8q5bs6d5b2mj7vc2cec.apps.googleusercontent.com',
                callback: handleCredentialResponse,
            });
        
            google.accounts.id.renderButton(
                document.getElementById('signInDiv'),
                { type: 'standard', 
                theme: 'filled_blue', 
                text: 'signin_with',
                ux_mode: 'popup', 
                size: 'large',
                width: '200',
                }
            );

            google.accounts.id.prompt();    
        }

    }, []);

    return (

        <div className="h-[100vh] flex items-center justify-center mt-12"> 
            
            <form className='rounded relative bg-white p-4 md:p-8 w-[85%] min-[550px]:w-[60%] sm:w-[52%] md:w-[45%] min-[1075px]:w-[32%] xl:w-[27%] 2xl:w-[22%] shadow-2xl shadow-gray-400' onSubmit={handleSubmit}>

                <h1 className='text-center text-2xl font-semibold mb-6'> SignIn </h1>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username or Email</label>
                        <div className='peer-focus:font-medium text-xs text-red-500'> {errors.username} </div>
                    </div>
                    
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        <div className='peer-focus:font-medium text-xs text-red-500'> {errors.password} </div>
                    </div>
                    
                    <a href="/auth/forgot-password" className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-500">Forgot Password?</a>

                    <div className="flex items-start mb-6 mt-5">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>

                    <div className='flex justify-center'>
                        <button className="w-[110px] text-white border-2 border-[#eeeeee] bg-orange-500 hover:bg-white hover:text-orange-500 hover:border-orange-500 rounded-sm font-semibold text-[15px] px-5 py-[10px] text-center mb-4">Submit</button>    
                    </div>    

                    <div className='w-full flex items-center'> <hr className='h-[2px] w-1/2 bg-[#bebebe]'/> <p className='mx-[5px] text-[12px] text-black'> OR </p>  <hr className='h-[2px] w-1/2 bg-[#bebebe]'/></div>

                    <div className='flex justify-center'> <div id='signInDiv' data-auto_select="true" className='mt-4 mb-5 flex justify-center'>  </div> </div> 

                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300"> Don't have an account? <a href="/auth/signup" className="text-blue-600 dark:text-blue-500 ml-1"> Signup </a> </h3>

            </form>

        </div>
    );
}
 
export default SignIn;