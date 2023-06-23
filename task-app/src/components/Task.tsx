import React, { useEffect, useState } from "react";
import { GlobalModal } from '../components/Modal'
import { ITask, addTask, deleteTask, updateTaskDescription, updateTaskName, updateTaskStart, updateTaskEnd, addTaskCategory, removeTaskCategory } from "../services/Task";
import { ITabSlice, sliceAddTask, sliceDeleteTask, sliceUpdateTaskDescription, sliceUpdateTaskName, sliceUpdateTaskStartDate, sliceUpdateTaskEndDate, sliceAddTaskCategory, sliceDeleteTaskCategory } from "../data/tabSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../data/store';
import DatePicker from "react-datepicker"
import { SelectedCategoryList, getCategoriesFromIds } from "./Categories";
import "react-datepicker/dist/react-datepicker.css";
import { ICategory } from "../services/Category";
import { addCategory, deleteCategory, updateCategoryName } from '../services/Category';
import { sliceAddCategory, sliceDeleteCategory, sliceUpdateCategory } from '../data/categorySlice';

const TaskCategories = ({task, icats} : {task: ITask, icats: ICategory[]}) => {
    const dispatch = useDispatch();

    const handleAddCat = (name) => {
        try {
                addCategory({
                    name: name
                }).then((newCategory) => {
                    dispatch(sliceAddCategory(newCategory))
                })
        } catch (error) {
            // popup
        }
    }

    const handleDeleteCat = (id) => {
        try {
            deleteCategory(id).then(() => {
                dispatch(sliceDeleteCategory(id))
            })
        } catch (error) {
            // popup
        }
    }

    const handleModCat = (id, name) => {
        try {
            updateCategoryName(id, name).then(() => {
                dispatch(sliceUpdateCategory({id: id, name: name}))
            })
        } catch (error) {
            // popup
        }
    }

    const handleSelectCat = (id) => {
        try {
            addTaskCategory(task._id, id).then(() => {
                dispatch(sliceAddTaskCategory({
                    id: task.tab, taskID: task._id, categoryID: id
                }))
            })
        } catch (error) {
            // popup
        }
    }

    const handleDeleteSelectCat = (id) => {
        try {
            removeTaskCategory(task._id, id).then(() => {
                dispatch(sliceDeleteTaskCategory({
                    id: task.tab, taskID: task._id, categoryID: id
                }))
            })
        } catch (error) {
            // popup
        }
    }

    return (
        <SelectedCategoryList selected={getCategoriesFromIds({ids: task.categories, categories: icats})} categories={icats} modalStyle=""
        handlers={{
            handleAddCat: handleAddCat,
            handleDeleteCat: handleDeleteCat,
            handleModCat: handleModCat,
            handleSelectCat: handleSelectCat
        }} handleDelete={handleDeleteSelectCat}/>
    )
}

const DatesModule = ({dispatch, task} : {dispatch, task: ITask}) => {
    const [startDate, setStartDate] = useState<Date | undefined>(task.time_start ? new Date(task.time_start) : undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(task.time_end ? new Date(task.time_end) : undefined);

    const updateStartDate = (date: Date | null, event) => {
        event.stopPropagation();

        try {
            updateTaskStart(task._id, date).then(() => {
                dispatch(sliceUpdateTaskStartDate({id: task.tab, taskID: task._id, sdate: date}))
                setStartDate(date)
            })
        } catch (error) {
        }
    }

    const updateEndDate = (date: Date | null, event) => {
        event.stopPropagation();

        try {
            if (date >= startDate || !date)
            updateTaskEnd(task._id, date).then(() => {
                dispatch(sliceUpdateTaskEndDate({id: task.tab, taskID: task._id, edate: date}))
                setEndDate(date)
            })
        } catch (error) {
        }
    }

    return (
        <div className="task-date-tab">
            <div className="task-date">
                <span> Start Date: </span>
                <DatePicker selected={startDate} onChange={updateStartDate}/>
            </div>
            <div className="task-date">
                <span> End Date: </span>
                <DatePicker selected={endDate} onChange={updateEndDate}/>
            </div>
        </div>
    )
}

const TaskModal = ({task, icats} : {task: ITask, icats: ICategory[]}) => {
    const dispatch = useDispatch();
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }


    // Updating task name
    const handleNameSubmit = (event) => {
        const inputValue = event.target.value;
        event.stopPropagation();
        // Setted new name
        if (task && inputValue.trim().length > 0 && task.name !== inputValue) {
            try {
                if (task._id) {
                    updateTaskName(task._id, inputValue).then(() => {
                        dispatch(sliceUpdateTaskName({
                            id: task.tab,
                            taskID: task._id,
                            name: inputValue
                        }))
                    })
                }
            } catch (error) {
                // popup
            }
            event.target.value = ''; // Clear input value
            return;
        }
    }

    // Updating task description
    const handleDescriptionSubmit = (event) => {
        const inputValue = event.target.value;
        event.stopPropagation();
        // Setted new name
        if (task && inputValue.trim().length > 0) {
            try {
                if (task._id) {
                    updateTaskDescription(task._id, inputValue).then(() => {
                        dispatch(sliceUpdateTaskDescription({
                            id: task.tab,
                            taskID: task._id,
                            description: inputValue
                        }))
                    })
                }
            } catch (error) {
                // popup
            }
            event.target.value = ''; // Clear input value
            return;
        }
    }

    // Deleting task
    const handleDelete = (event) => {
        event.stopPropagation();
        if (task && task._id) {
            try {
                deleteTask(task._id).then(() => {
                    dispatch(sliceDeleteTask({id: task.tab, task: task}))
                })
            } catch (error) {
                // popup
            }
        }
    }

    // Categories

    return (
        <div className="container tab">
            <div className="col flex-column">
                <div className="col-lg-12">
                    <div className="">
                        <div className="modal-card tab">
                            <TaskCategories task={task} icats={icats}/>
                            <textarea rows={1} cols={1} className="task-modal-name task-input" placeholder={task ? task.name : ""}
                            onBlur={handleNameSubmit}
                            />
                            <textarea rows={5} cols={50} className="form-resizable task-input" placeholder={task ? task.description : ""}
                            onBlur={handleDescriptionSubmit}
                            />
                            <DatesModule dispatch={dispatch} task={task}/>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const Task = ({task} : {task: ITask}) => {
    const icats = useSelector((state: RootState) => state.category);
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <div>
            <button className="btn task-name" onClick={() => {setModal(1)}}>
                {task.name}
            </button>
            <GlobalModal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={TaskModal} task={task} icats={icats}></GlobalModal>
        </div>
    );
}

export const TaskCreator = ({parentTab} : {parentTab: ITabSlice}) => {
    const dispatch = useDispatch();

    const createTask = (event) => {
        const inputValue = event.target.value;
        event.stopPropagation();
        if (inputValue.trim().length > 0) {
            try {
                addTask({
                    name: inputValue,
                    description: "...Add a description",
                    categories: [],
                    tab: parentTab.tab._id
                }).then(newTab => {
                    dispatch(sliceAddTask({
                        id: parentTab.tab._id,
                        task: newTab
                    }))
                })
                event.target.value = ''; // Clear input value
            } catch (error) {
                // popup
            }
        }
    }

    return (
        <div>
            <input className="form" placeholder={"+ Add a task"} onBlur={createTask}/>
        </div>
    )
}