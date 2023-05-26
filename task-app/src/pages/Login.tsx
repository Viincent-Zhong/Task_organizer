import React from "react";
import Button from '../components/TestButton'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { successedLogin, failedLogin } from '../services/Auth'

export default class Login extends React.Component {
        render() {
        return (
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div>
                <Button/>
                <GoogleLogin
                    onSuccess={successedLogin}
                    onError={failedLogin}
                />
            </div>
            </GoogleOAuthProvider>
        );
    }
}