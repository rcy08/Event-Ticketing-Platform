
import { useEffect, useState } from 'react';
import { Avatar, Dropdown, Navbar, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavbarWithDropdown() {

  const navigate = useNavigate();

  const [user, setUser] = useState('');

  const handleSignout = async () => {
    localStorage.removeItem('userToken');
    navigate('/');
  }

  useEffect(() => {
    
    const getDetails = async () => {
        const response = await fetch('/auth/user-details', {
          method: 'GET',
          headers: { 'Authorization' : `Bearer ${localStorage.getItem('userToken')}` },
        });

        const data = await response.json();

        setUser(data.user);
    }; 

    if (localStorage.getItem('userToken')) getDetails();

  }, []);

  return (

    <div className='navbar'> 
      
        <Navbar
          fluid
          rounded
          className='bg-red'
        >
          <Navbar.Brand href="/">
            <img
              alt="Flowbite"
              className="mr-3 h-6 sm:h-9"
              src="/favicon.svg"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> Event Ticketing </span>
          </Navbar.Brand>

          { localStorage.getItem('userToken') ? 

              <div className="flex md:order-2 w-0">
                <Dropdown
                  inline
                  label={<Avatar alt="User settings" img="" rounded/>}
                >
                  <Dropdown.Header>
                    <span className="font-bold block text-sm w-40 my-2"> {user.username} </span>
                    <span className="font-bold block truncate text-sm w-52 my-1"> {user.email} </span>
                  </Dropdown.Header>

                  <a href='/' className='font-medium text-black-600 dark:text-blue-500 px-4 py-2 w-40'> Profile </a>
                  <Dropdown.Divider />
                  <a href='/' className='font-medium text-black-600 dark:text-blue-500 px-4 py-2 w-40'> Your Events </a>
                  <Dropdown.Divider />
                  <a href='/' className='font-medium text-black-600 dark:text-blue-500 px-4 py-2 w-40'> Earnings </a>
                  <Dropdown.Divider />
                  <Button gradientMonochrome="failure" className='font-medium text-white-600 dark:text-blue-500 px-0 py-0 mx-4 h-8 w-22' onClick={handleSignout}> Sign Out </Button>
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

            <Navbar.Link href="/events/create" className='font-bold text-base text-black-600 dark:text-blue-500 mr-10 w-28'> Create Events </Navbar.Link>

            <Navbar.Link href="/" className='font-bold text-base text-black-600 dark:text-blue-500 px-4 w-28'> Pricing </Navbar.Link>

            <Navbar.Link href="/" className='font-bold text-base text-black-600 dark:text-blue-500 px-4 w-28'> Contact </Navbar.Link>

          </Navbar.Collapse>
        </Navbar>


    </div>

    
  )
}


