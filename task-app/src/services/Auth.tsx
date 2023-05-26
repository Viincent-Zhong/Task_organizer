import CryptoJS from 'crypto-js';
import axios from 'axios';
import { BACKEND_URL } from '../constants'

export const successedLogin = credentialResponse => {
    const credential = credentialResponse.credential;

    // Encrypt credential
    const crypted = CryptoJS.AES.encrypt(credential, process.env.REACT_APP_ENCRYPT_KEY).toString();
    const login = async (credential) => {
        const res = await loginCall(credential)
        return res
    };

    const res = login(crypted);
    console.log('Response: ' + res)
};

export const failedLogin = () => {
    console.log('Login Failed');
};

function loginCall(credential): Promise<any> {
    const url = `${BACKEND_URL}/auth/login`;
    console.log('sending gid : ' + credential)
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
