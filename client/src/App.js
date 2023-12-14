import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllEvents from './pages/events/AllEvents';
import Event from './pages/events/Event';
import CreateEvent from './pages/events/CreateEvent';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Profile from './pages/auth/Profile';
import EmailVerification from './pages/auth/EmailVerification';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Loading from './Loading';

import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { signedin, dispatch } = useAuthContext();

  setTimeout(() => {
    if(signedin){
      localStorage.removeItem('userToken');
      dispatch({ type: 'SIGNOUT' });
      window.location.reload();
    }
  }, 24*60*60*1000);

  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleWindowLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50; 

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right');
    // add your conditional logic here
  };

  return (

    <>
    {
      loading ? <Loading /> : 

      <div className='absolute left-0 right-0 top-0 min-h-[100vh] bg-[#f1f5f9] flex flex-col' onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>

        <Navbar />
        <Routes>

            <Route 
              path='/'
              element= {<Home />}
            />
            <Route
              path='/events'
              element= {<AllEvents />}
            />
            <Route 
              path='/event/:id'
              element={<Event />}
            />
            <Route 
              path='/events/create'
              element={<CreateEvent />}
            />
            <Route 
              path='/profile/:username'
              element={<Profile />}
            />
            <Route 
              path='/auth/signup'
              element={ !signedin ? <SignUp /> : <Navigate to='/' /> }
            />
            <Route 
              path='/auth/signin'
              element={ !signedin ? <SignIn /> : <Navigate to='/' /> }
            />
            <Route 
              path='/auth/email-verification/:verificationToken'
              element={ !signedin ? <EmailVerification /> : <Navigate to='/' /> }
            />
            <Route 
              path='/auth/forgot-password'
              element={ !signedin ? <ForgotPassword /> : <Navigate to='/' /> }
            />
            <Route 
              path='/auth/reset-password/:resetToken'
              element={ !signedin ? <ResetPassword /> : <Navigate to='/' /> }
            />
            <Route 
              path='*'
              element={ <NotFound /> }
            />

        </Routes>
        <Footer />

      </div>
    }
      
    </>
    
  );
}

export default App;