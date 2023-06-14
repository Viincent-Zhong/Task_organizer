import axios from 'axios';
import { BACKEND_URL } from '../constants'

export interface ITab {
    name: string;
    _id?: string;
    createdBy?: string;
}

function requestGetAllTab(): Promise<any> {
    const url = `${BACKEND_URL}/tab/`;
    return axios.get<ITab[]>(url,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const getAllTab = async () => {
    var res = await requestGetAllTab()

    if (res.status === 200) {
        return res.data;
    } else {
        throw new Error('Request error')
    }
}

function requestAddTab(tab: ITab): Promise<any> {
    const url = `${BACKEND_URL}/tab/`;
    return axios.post(url, JSON.stringify(tab),
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const addTab = async (tab: ITab) => {
    var res = await requestAddTab(tab)

    if (res.status === 200)
        return
    else {
        throw new Error('Request error')
    }
}

function requestDeleteTab(tabID): Promise<any> {
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

export const deleteTab = async (tabID) => {
    var res = await requestDeleteTab(tabID)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestUpdateTabName(tabID, name: string): Promise<any> {
    const url = `${BACKEND_URL}/tab/name/`;
    return axios.patch(url, {name: name},
        {
            params: {
                id: tabID
            },
            withCredentials: true // Set cookie in header
        }
    );
}

export const updateTabName = async (tabID, name: string) => {
    var res = await requestUpdateTabName(tabID, name)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}
