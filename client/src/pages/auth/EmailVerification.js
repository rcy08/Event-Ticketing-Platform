
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmailVerification = () => {

    const { verificationToken } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const Verify = async () => {

            const response = await fetch(`https://ticketvibe-server.cyclic.app/auth/email-verification/${verificationToken}`, {
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
            navigate('/auth/signin');
        }

        Verify();

    });

    return (
        <div className="container bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."> 
            
        </div>
    );
}
 
export default EmailVerification;