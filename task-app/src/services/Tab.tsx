import axios from 'axios';
import { BACKEND_URL } from '../constants'
import Cookies from 'js-cookie';

interface ITab {
    name: string;
    _id?: string;
    createdBy?: string;
}

function requestGetAllTab(): Promise<any> {
    const url = `${BACKEND_URL}/tab/`;
    return axios.get<ITab>(url,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

function requestAddOneTab(): Promise<any> {
    const url = `${BACKEND_URL}/tab/`;
    return axios.post<ITab>(url,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

function requestDeleteOneTab(tabID): Promise<any> {
    const url = `${BACKEND_URL}/tab/`;
    return axios.delete(url,
        {
            params: {
                id: tabID
            },
            withCredentials: true // Set cookie in header
        }
    );
}

function requestUpdateTabName(tabID, name): Promise<any> {
    const url = `${BACKEND_URL}/tab/`;
    return axios.patch(url, {},
        {
            params: {
                id: tabID
            },
            withCredentials: true // Set cookie in header
        }
    );
}