import axios from 'axios';
import { BACKEND_URL } from '../constants'

export interface IFilter {
    name: string;
    _id?: string;
    createdBy?: string;
    categories: string;
}

function requestGetAllFilter(): Promise<any> {
    const url = `${BACKEND_URL}/filter/`;
    return axios.get<IFilter[]>(url,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const getAllFilter = async () => {
    var res = await requestGetAllFilter()

    if (res.status === 200) {
        return res.data;
    } else {
        throw new Error('Request error')
    }
}

function requestAddFilter(filter: IFilter): Promise<any> {
    const url = `${BACKEND_URL}/filter/`;
    return axios.post<IFilter>(url, filter,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const addFilter = async (filter: IFilter) => {
    var res = await requestAddFilter(filter)

    if (res.status === 200)
        return res.data
    else {
        throw new Error('Request error')
    }
}

function requestDeleteFilter(filterID): Promise<any> {
    const url = `${BACKEND_URL}/filter/`;
    return axios.delete(url,
        {
            params: {
                id: filterID
            },
            withCredentials: true // Set cookie in header
        }
    );
}

export const deleteFilter = async (filterID) => {
    var res = await requestDeleteFilter(filterID)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestUpdateFilterName(filterID, name: string): Promise<any> {
    const url = `${BACKEND_URL}/filter/name/`;
    return axios.patch(url, {name: name},
        {
            params: {
                id: filterID
            },
            withCredentials: true // Set cookie in header
        }
    );
}

export const updateFilterName = async (filterID, name: string) => {
    var res = await requestUpdateFilterName(filterID, name)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestAddFilterCategory(filterID, categoryID): Promise<any> {
    const url = `${BACKEND_URL}/filter/category/`;
    return axios.patch(url,
        {
            params: {
                id: filterID,
                categoryId: categoryID
            },
            withCredentials: true // Set cookie in header
        }
    );
}

export const addFilterCategory = async (filterID, categoryID) => {
    var res = await requestAddFilterCategory(filterID, categoryID)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestRemoveFilterCategory(filterID, categoryID): Promise<any> {
    const url = `${BACKEND_URL}/filter/category/`;
    return axios.patch(url,
        {
            params: {
                id: filterID,
                categoryId: categoryID
            },
            withCredentials: true // Set cookie in header
        }
    );
}

export const removeFilterCategory = async (filterID, categoryID) => {
    var res = await requestRemoveFilterCategory(filterID, categoryID)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}
