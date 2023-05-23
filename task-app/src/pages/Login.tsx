import React from "react";
import Button from '../components/TestButton'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken';

export default class Login extends React.Component {
        render() {
        return (
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div>
                <Button/>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const credential = credentialResponse.credential;
                        const decodedToken = jwt.decode(credential, { complete: true });
                        const googleId = decodedToken.payload.sub;
                        console.log("googleID : " + googleId);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
            </GoogleOAuthProvider>
        );
    }
}