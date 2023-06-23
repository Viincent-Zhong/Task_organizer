import axios from 'axios';
import { BACKEND_URL } from '../constants'

export interface ITask {
    name: string;
    _id?: string;
    createdBy?: string;
    description: string;
    time_start?: Date;
    time_end?: Date;
    categories: string[];
    tab: string;
}

function requestGetAllTask(): Promise<any> {
    const url = `${BACKEND_URL}/task/`;
    return axios.get<ITask[]>(url,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const getAllTask = async () => {
    var res = await requestGetAllTask()

    if (res.status === 200) {
        return res.data;
    } else {
        throw new Error('Request error')
    }
}

function requestGetTask(taskID): Promise<any> {
    const url = `${BACKEND_URL}/task/${taskID}`;
    return axios.get<ITask>(url,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const getTask = async (taskID) => {
    var res = await requestGetTask(taskID)

    if (res.status === 200) {
        return res.data;
    } else {
        throw new Error('Request error')
    }
}

function requestAddTask(task: ITask): Promise<any> {
    const url = `${BACKEND_URL}/task/`;
    return axios.post<ITask>(url, task,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const addTask = async (task: ITask) => {
    var res = await requestAddTask(task)

    if (res.status === 200)
        return res.data
    else {
        throw new Error('Request error')
    }
}

function requestDeleteTask(taskID): Promise<any> {
    const url = `${BACKEND_URL}/task/${taskID}`;
    return axios.delete(url,
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const deleteTask = async (taskID) => {
    var res = await requestDeleteTask(taskID)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestUpdateTaskName(taskID, name: string): Promise<any> {
    const url = `${BACKEND_URL}/task/name/${taskID}`;
    return axios.patch(url, {name: name},
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const updateTaskName = async (taskID, name: string) => {
    var res = await requestUpdateTaskName(taskID, name)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestUpdateTaskDescription(taskID, description: string): Promise<any> {
    const url = `${BACKEND_URL}/task/description/${taskID}`;
    return axios.patch(url, {description: description},
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const updateTaskDescription = async (taskID, description: string) => {
    var res = await requestUpdateTaskDescription(taskID, description)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestAddTaskCategory(taskID, categoryID): Promise<any> {
    const url = `${BACKEND_URL}/task/category/${taskID}/${categoryID}`;
    return axios.patch(url, {},
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const addTaskCategory = async (taskID, categoryID) => {
    var res = await requestAddTaskCategory(taskID, categoryID)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestRemoveTaskCategory(taskID, categoryID): Promise<any> {
    const url = `${BACKEND_URL}/task/category/${taskID}/${categoryID}`;
    return axios.patch(url, {},
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const removeTaskCategory = async (taskID, categoryID) => {
    var res = await requestRemoveTaskCategory(taskID, categoryID)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestUpdateTaskStart(taskID, start: Date | null): Promise<any> {
    const url = `${BACKEND_URL}/task/start/${taskID}`;
    return axios.patch(url, {start: start},
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const updateTaskStart = async (taskID, start: Date | null) => {
    var res = await requestUpdateTaskStart(taskID, start)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestUpdateTaskEnd(taskID, end: Date | null): Promise<any> {
    const url = `${BACKEND_URL}/task/end/${taskID}`;
    return axios.patch(url, {end: end},
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const updateTaskEnd = async (taskID, end: Date | null) => {
    var res = await requestUpdateTaskEnd(taskID, end)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}

function requestUpdateTaskTab(taskID, tabID): Promise<any> {
    const url = `${BACKEND_URL}/task/tab/${taskID}/${tabID}`;
    return axios.patch(url, {tabID: tabID},
        {
            withCredentials: true // Set cookie in header
        }
    );
}

export const updateTaskTab = async (taskID, tabID) => {
    var res = await requestUpdateTaskTab(taskID, tabID)

    if (res.status === 200)
        return;
    else {
        throw new Error('Request error')
    }
}
