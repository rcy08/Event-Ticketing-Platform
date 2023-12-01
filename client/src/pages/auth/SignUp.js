
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const SignUp = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {

        const handleCheck = () => {
            if(password.length > 0 && confirmpassword.length > 0){
                if(password !== confirmpassword){
                    setErrors({ ...errors, confirmpassword: `Passwords don't match` });
                }
                else{
                    setErrors({ ...errors, confirmpassword: '' });
                }
            }
            else{
                setErrors({});
            }
        }

        document.addEventListener('click', handleCheck);  
    
    }, [password, confirmpassword]);

    useEffect(() => {

        const handleCheck = () => {
            if(password.length > 0 && password.length < 6){
                setErrors({ ...errors, password: 'Minimum length of password is 6 characters' });
            }
            else{
                setErrors({ ...errors, password: '' });
            }
        }

        document.addEventListener('click', handleCheck);  
    
    }, [password]);

    useEffect(() => {

        const handleCheck = () => {
            if(username.length > 0 && username.length < 4){
                setErrors({ ...errors, username: 'Minimum length of username is 6 characters' });
            }
            else{
                setErrors({ ...errors, username: '' });
            }
        }

        document.addEventListener('click', handleCheck);  
    
    }, [username]);

    useEffect(() => {

        const handleCheck = () => {
            if(fname.length > 0 && fname.length < 6){
                setErrors({ ...errors, fname: 'Minimum length of first name is 6 characters' });
            }
            else{
                setErrors({ ...errors, fname: '' });
            }
        }

        document.addEventListener('click', handleCheck);  
    
    }, [fname]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password === confirmpassword && password.length >= 6 && username.length >= 4 && fname.length >= 4) {

            const response = await fetch('https://ticketvibeserver.cyclic.app/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ fname, lname, username, email, password, dob })
            });

            const data = await response.json();

            if (data.errors) {
                setErrors(data.errors);
            }
            else {
                setErrors({});
                setFname('');
                setLname('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setUsername('');
                setDob('');
                alert('Please verify your email id through the link sent on your email');
                navigate('/auth/signin');
            }   
        }
        else{
            if (fname.length < 4) {
                setErrors({
                    fname: 'Minimum length of first Name is 4 Characters',
                })
            }
            else if (username.length < 4) {
				setErrors({
					username: 'Minimum length of username is 4 characters',
				});
			}
			else if (password.length < 6) {
				setErrors({
					password: 'Minimum length of password is 6 characters',
				});
			}
            else {
				setErrors({
					confirmpassword: `Passwords don't match`,
				});
			}
        }

    }

    const handleCredentialResponse = async (response) => {

        /* global google */

        var userObject = jwt_decode(response.credential);

        console.log(userObject);
    
        const res = await fetch('https://ticketvibeserver.cyclic.app/auth/google-user/signup', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ userObject, token: response.credential, client_id: '707253678289-0bbj3lbd22h8r8q5bs6d5b2mj7vc2cec.apps.googleusercontent.com',  })
        });

        const data = await res.json();

        if(data.error){
            alert(data.error);
            if(data.error === 'This account is already registered. Please signin now') navigate('/auth/signin');
            return;
        }
        
        alert(data.message);
        navigate('/auth/signin');
        
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '707253678289-0bbj3lbd22h8r8q5bs6d5b2mj7vc2cec.apps.googleusercontent.com',
            callback: handleCredentialResponse,
        });
    
        google.accounts.id.renderButton(
            document.getElementById('signUpDiv'),
            { type: 'standard', 
              theme: 'filled_blue', 
              text: 'signup_with',
              ux_mode: 'popup', 
              size: 'large',
              width: '200'
            }
        );
        
    }, []);

    return (
        
        <div className="h-[100vh] flex items-center justify-center"> 
            
            <form className="rounded relative w-[75%] min-[550px]:w-[60%] sm:w-[50%] md:w-[40%] min-[1075px]:w-[30%] xl:w-[25%] 2xl:w-[20%]" onSubmit={handleSubmit}>

                <h1 className='text-center text-2xl font-semibold mb-6'> SignUp </h1>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    <div className='peer-focus:font-medium text-xs text-red-500'> {errors.email} </div>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
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
                    <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    <div className='peer-focus:font-medium text-xs text-red-500'> {errors.confirmpassword} </div>
                </div>

                <div className="grid sm:grid-cols-2 sm:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        <div className='peer-focus:font-medium text-xs text-red-500 w-32'> {errors.fname} </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                        />
                        <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                    
                </div>

                <div className="grid sm:grid-cols-2 sm:gap-6">

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "   value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        <div className='peer-focus:font-medium text-xs text-red-500 w-32'> {errors.username} </div>
                    </div>
                    
                    <div className='relative z-0 w-full mb-6 group'>
                        <input type="date" name='floating_dob' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Date of Birth" 
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                        <label for='floating_dob' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'> Date of Birth </label>
                    </div>

                </div>

                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="/" className="text-blue-600 dark:text-blue-500">terms and conditions</a>.</label>
                </div>

                <div className='flex justify-center'>
                    <button className="w-[200px] text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Submit</button>    
                </div>

                <div className='flex justify-center'> <div id='signUpDiv' className='mt-3 mb-5 flex justify-center'>  </div> </div>
                
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300"> Already have an account? <a href="/auth/signin" className="text-blue-600 dark:text-blue-500"> Signin </a> </h3>

            </form>
        
        </div>

    );
}
 
export default SignUp;