import axios from 'axios';
import { BACKEND_URL } from '../constants'
import Cookies from 'js-cookie';

interface ITask {
    name: string;
    _id: string;
    createdBy: string;
    description: string;
    time_start: Date;
    time_end: Date;
    categories: string[];
    tab: string;
}

export function getTasks(userID): Promise<any> {
    // const userID = Cookies.get('auth');

    const url = `${BACKEND_URL}/task/`;
    return axios.get(url,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // Set cookie in header
        }
    );
}