import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Card } from 'flowbite-react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';


const Profile = () => {

    const[userDetails, setUserDetails] = useState({});

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');

    const { signedin, user, dispatch } = useAuthContext();

    useEffect(() => {
        if (signedin) {
          setUserDetails(user.user);
          setFname(user.user.fname);
          setLname(user.user.lname);
          setEmail(user.user.email);
          setUsername(user.user.username);
          setDob(user.user.dob);
        }
    }, [signedin, user, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if(fname != userDetails.fname || lname != userDetails.lname || email != userDetails.email || )
        

    }

    return (
        <div className='mt-40 mb-40 flex flex-row justify-center items-center'>

            {/* <Card
                imgAlt=""
                imgSrc="/images/blog/image-1.jpg"
                className='flex flex-row justify-center items-center w-2/3'
            > */}
                {/* <form className='rounded' onSubmit={handleSubmit} >

                <h1 className='mb-16 font-semibold text-xl'> Your Details </h1>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        <div className='peer-focus:font-medium text-xs text-red-500'> {} </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                            />
                            <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            <div className='peer-focus:font-medium text-xs text-red-500 w-32'> {} </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                            <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        </div>
                        
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">

                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                            <div className='peer-focus:font-medium text-xs text-red-500 w-32'> {} </div>
                        </div>
                        
                        <div className='relative z-0 w-full mb-6 group'>
                            <input type="date" name='floating_dob' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Date of Birth" 
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                            <label for='floating_dob' className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'> Date of Birth </label>
                        </div>

                    </div>

                    <div className='flex flex-row justify-center mt-8' > <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-28"> Edit Details </button> </div>

                </form> */}

                {/* <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> Username - {userDetails.username} </p> 
                </h5>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> Email - {userDetails.email} </p> 
                </h5>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> First Name - {userDetails.fname} </p> 
                </h5>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> Last Name - {userDetails.lname} </p>
                </h5>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> DOB - {userDetails.dob} </p> 
                </h5> */}

                
                    
                {/* <p className="font-normal text-gray-700 dark:text-gray-400">
                            <p>
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </p> */}    
            {/* </Card> */}

            <form className="flex w-1/2 flex-col gap-4">
                    
                <h1 className='font-bold text-2xl mb-8'> {username} </h1>

                <div>
                    <div className="mb-2 flex flex-row relative">
                        <Label
                            htmlFor="email2"
                            value="Email:"
                            className='my-auto mr-8 text-base'
                        />
                        <TextInput
                            id="email2"
                            placeholder="Email Address"
                            required
                            shadow
                            type="email"
                            value={email}
                            className='mr-8'
                        />
                        <Button type="submit" className='absolute right-0 py-px'> Edit </Button>
                    </div>
                </div>
                <div>
                    <div className="mb-2 flex flex-row relative">
                        <Label
                            htmlFor="text2"
                            value="First Name:"
                            className='my-auto mr-8 text-base'
                        />
                    
                        <TextInput
                            id="text2"
                            placeholder="First Name"
                            required
                            shadow
                            type="text"
                            value={fname}
                            className='mr-8'
                        />
                        <Button type="submit" className='absolute right-0 py-px'> Edit </Button>
                    </div>
                </div>
                <div>
                    <div className="mb-2 flex flex-row relative">
                        <Label
                            htmlFor="text2"
                            value="Last Name:"
                            className='my-auto mr-8 text-base'
                        />
                    
                        <TextInput
                            id="text2"
                            placeholder="Last Name"
                            required
                            shadow
                            type="text"
                            value={lname}
                            className='mr-8'
                        />
                        <Button type="submit" className='absolute right-0 py-px'> Edit </Button>
                    </div>
                </div>
                <div>
                    <div className="mb-2 flex flex-row relative">
                        <Label
                            htmlFor="date2"
                            value="Date of Birth:"
                            className='my-auto mr-8 text-base'
                        />
                    
                        <TextInput
                            id="date2"
                            placeholder="Date of Birth"
                            required
                            shadow
                            type="date"
                            value={dob}
                            className='mr-8'
                        />
                        <Button type="submit" className='absolute right-0 py-px'> Edit </Button>
                    </div>
                </div>
            </form>

        </div>
    );
}
 
export default Profile;