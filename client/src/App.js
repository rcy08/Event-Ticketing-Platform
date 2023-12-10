import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { signedin } = useAuthContext();

  const { path } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (

      <div className='absolute left-0 right-0 top-0 min-h-[100vh] flex flex-col'>

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
    
  );
}

export default App;