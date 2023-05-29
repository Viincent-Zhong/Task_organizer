import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from '../constants'
import Cookies from 'js-cookie';

export const succeedLogin = (credentialResponse) => {
    const credential = credentialResponse.credential;

    // Encrypt credential
    const crypted = CryptoJS.AES.encrypt(credential, process.env.REACT_APP_ENCRYPT_KEY).toString();
    const login = async (credential) => {
        const res = await loginCall(credential)
        return res
    };

    return login(crypted);
};

export const failedLogin = () => {
    console.log('Login Failed');
};

function loginCall(credential): Promise<any> {
    const url = `${BACKEND_URL}/auth/login`;
    return axios.post(url,
        {
            gcredential: credential
        },
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // Set cookie in header
        }
    );
}

export const isLoggedIn = () => {
    return Cookies.get('auth') !== undefined;
}