import axios from 'axios';
import { BACKEND_URL } from '../constants'

export interface ICategory {
    name: string;
    _id?: string;
    createdBy?: string;
}

function requestGetAllCategory(): Promise<any> {
    const url = `${BACKEND_URL}/category/`;
    return axios.get<ICategory[]>(url,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const getAllCategory = async () => {
    var res = await requestGetAllCategory()

    if (res.status === 200) {
        return res.data;
    } else {
        throw new Error('Request error')
    }
}

function requestAddCategory(category: ICategory): Promise<any> {
    const url = `${BACKEND_URL}/category/`;
    return axios.post(url, JSON.stringify(category),
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const addCategory = async (category: ICategory) => {
    var res = await requestAddCategory(category)

    if (res.status === 200)
        return
    else {
        throw new Error('Request error')
    }
}

function requestDeleteCategory(categoryID): Promise<any> {
    const url = `${BACKEND_URL}/category/`;
    return axios.delete(url,
        {
            params: {
                id: categoryID
            },
            withCredentials: true // Set cookie in header
        }
    );
}

export const deleteCategory = async (categoryID) => {
    var res = await requestDeleteCategory(categoryID)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestUpdateCategoryName(categoryID, name: string): Promise<any> {
    const url = `${BACKEND_URL}/category/name/`;
    return axios.patch(url, {name: name},
        {
            params: {
                id: categoryID
            },
            withCredentials: true // Set cookie in header
        }
    );
}

export const updateCategoryName = async (categoryID, name: string) => {
    var res = await requestUpdateCategoryName(categoryID, name)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}
