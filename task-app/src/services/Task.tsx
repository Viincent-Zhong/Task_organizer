export interface ITask {
    name: string;
    _id: string;
    time_start: Date;
    time_end: Date;
    description: string;
    categories: string[];
}

export interface ITab {
    name: string;
    _id: string;
    tasks: string[];
}

// CRUD TASK
// CRUD TAB