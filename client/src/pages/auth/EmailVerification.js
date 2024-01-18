
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {

    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    const verificationToken = searchParams.get('token');
    console.log(verificationToken);
    const navigate = useNavigate();

    useEffect(() => {

        const Verify = async () => {

            const response = await fetch(`https://ticketvibeserver.cyclic.app/auth/email-verification?token=${verificationToken}`, {
                method : 'POST',
                headers: { 'Content-Type' : 'application/json' },
            });

            const data = await response.json();

            if(data.errors){
                alert('Email Not Verified!');
            }
            else{
                alert('Email Verified!');
            }
            searchParams.delete('token');
            searchParams.set('redirect_uri', '/');
            window.location.href = `/auth/signin?${searchParams.toString()}${currentUrl.hash}`;
        }

        Verify();

    });

    return (
        <div className=""> 
            
        </div>
    );
}
 
export default EmailVerification;