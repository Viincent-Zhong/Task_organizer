import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { succeedLogin, failedLogin } from '../services/Auth'
import { useNavigate } from "react-router-dom"
import { isLoggedIn } from "../services/Auth"

// export default class Login extends React.Component {
export const Login = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    })

    const handleLogin = (credential) => {
        succeedLogin(credential).then((res) => {
            var status = Math.floor(status / 100) // one digit for hundreds
            console.log('Status : ' + status)
            if (status == 2) { // Good code
                navigate('/')
            } else {
            }
        }).catch((_) => {
            console.log('Error trying to connect')
        });
    };

    const btnCentered = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div style={btnCentered}>
            <GoogleLogin
                onSuccess={handleLogin}
                onError={failedLogin}
            />
        </div>
        </GoogleOAuthProvider>
    );
}