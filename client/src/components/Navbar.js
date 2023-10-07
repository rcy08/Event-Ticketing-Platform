import { useEffect, useState } from 'react';
import { Dropdown, Navbar, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { MdLogout } from 'react-icons/md';

export default function NavbarWithDropdown() {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState('');

  const { signedin, user, dispatch } = useAuthContext();

  const handleSignout = async () => {
    localStorage.removeItem('userToken');
    dispatch({ type: 'SIGNOUT' });
    navigate('/');
  }

  useEffect(() => {
    if (signedin) {
      setUserDetails(user.user);
    }
  }, [signedin, user, dispatch]);

  return (

    <div className='navbar'> 
      
        <Navbar
          fluid
          rounded
          className='bg-red'
        >
          <Navbar.Brand href="/">
            <img
              alt=""
              className="mr-3 h-6 sm:h-9"
              src="/favicon.svg"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> Ticketvibe </span>
          </Navbar.Brand>

          { signedin ? 

              <div className="flex md:order-2 w-0 mr-16">
                <Dropdown label="rc08">

                  <Dropdown.Header>
                    <span className="block text-lg font-bold mb-2">
                      {userDetails.username}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {userDetails.email}
                    </span>
                  </Dropdown.Header>
                  
                    <Link to={'/profile/'+userDetails.username}> 
                      <div className='hover:bg-gray-100'>
                        <div className='ml-4 h-10 flex flex-row items-center'> Profile </div>
                      </div>
                    </Link>

                    <Link to='/'> 
                      <div className='hover:bg-gray-100'>
                        <div className='ml-4 h-10 flex flex-row items-center'> My Events </div> 
                      </div> 
                    </Link> 
                    
                    <Dropdown.Divider />

                    <div className='hover:bg-gray-100'>
                      <button className='flex flex-row items-center ml-4 h-10 w-full font-semibold' onClick={handleSignout}>
                        <MdLogout className='my-auto mr-2' />
                        <p className='text-red-500'> Sign Out </p> 
                      </button>
                    </div>
                    
              </Dropdown>

                <Navbar.Toggle />
              </div>    

              : 

              <div className='flex md:order-2 w-28 h-8'> 

                <Button.Group>
                  <Button gradientMonochrome="info">
                    <Link to='/auth/signin'> SignIn </Link>  
                  </Button>
                  <Button gradientMonochrome="info">
                  <Link to='/auth/signup'> SignUp </Link>  
                  </Button>
                </Button.Group>
  
              </div>
              
          }

          <Navbar.Collapse>

            <Navbar.Link href="/" className='font-bold text-base text-black-600 dark:text-blue-500 px-4 w-28 mr-1'> Home </Navbar.Link>

            <Navbar.Link href="/events" className='font-bold text-base text-black-600 dark:text-blue-500 px-4 w-28'> Events </Navbar.Link>

            <Navbar.Link href="/events/create" className='font-bold text-base text-black-600 dark:text-blue-500 mr-12 w-28'> Create Events </Navbar.Link>

            <Navbar.Link href="/" className='font-bold text-base text-black-600 dark:text-blue-500 px-4 w-28'> Pricing </Navbar.Link>

            <Navbar.Link href="/" className='font-bold text-base text-black-600 dark:text-blue-500 px-4 w-28'> Contact </Navbar.Link>

          </Navbar.Collapse>
        </Navbar>


    </div>
  )
}


