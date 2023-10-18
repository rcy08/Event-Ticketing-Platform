
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useAuthContext } from '../../hooks/useAuthContext';

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

    const handleCallbackResponse = async (response) => {

        /* global google */
    
        var userObject = jwt_decode(response.credential);
    
        const email = userObject.email;
        const name = userObject.name;
        const picture = userObject.picture;
    
        await fetch('https://ticketvibeserver.cyclic.app/auth/google-user', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ email, name, picture })
        });
    
        localStorage.setItem('userToken', `Google ${response.credential}`);
        navigate('/');
    }
          
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '612987450052-in3r5qdbaun3ph32uf0j3hu2ad5sfe14.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });
    
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size: 'large' }
        );
    }, []);

    return (

        <div className="container"> 

        <div className="signin-form">
            
        <form className='rounded relative' onSubmit={handleSubmit}>

            <h1> Signin </h1>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username or Email</label>
                    <div className='peer-focus:font-medium text-xs text-red-500'> {errors.username} </div>
                </div>
                
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-80 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    <div className='peer-focus:font-medium text-xs text-red-500'> {errors.password} </div>
                </div>
                
                <a href="/auth/forgot-password" className="absolute left-3 ml-2 mt-1 mb-2 text-sm font-medium text-blue-600 dark:text-blue-500 mb-5">Forgot Password?</a>

                <div className="flex items-start mb-6 mt-8">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>

                <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-28">Submit</button>

                <div id='signInDiv' className='mt-3 mb-1'>  </div>

                <h3 className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Don't have an account? <a href="/auth/signup" className="text-blue-600 dark:text-blue-500"> Signup </a> </h3>

            </form>

        </div>

        </div>
    );
}
 
export default SignIn;