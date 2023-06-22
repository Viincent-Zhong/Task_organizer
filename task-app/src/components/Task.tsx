import React, { useState } from "react";
import { GlobalModal, Modal, OpenButton } from '../components/Modal'
import { ITask, addTask, deleteTask, updateTaskDescription, updateTaskName } from "../services/Task";
import { ITabSlice, sliceAddTask, sliceDeleteTask, sliceUpdateTaskDescription, sliceUpdateTaskName } from "../data/tabSlice";
import { useDispatch } from "react-redux";

const TaskCategories = ({closeButton: CloseButton, userID}) => {
    return (
        <div style={{position: 'relative'}}>
            {CloseButton}
        </div>
    )
}

const TaskModal = ({closeButton: CloseButton, task} : {closeButton, task: ITask}) => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    const dispatch = useDispatch();

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
    // Start
    // End

    return (
        <div className="container tab">
            <div className="col flex-column">
                <div className="col-lg-12">
                    <div className="">
                        <div className="modal-card tab">
                            <textarea rows={1} cols={1} className="task-modal-name task-input" placeholder={task ? task.name : ""}
                            onBlur={handleNameSubmit}
                            />
                            <textarea rows={5} cols={50} className="form-resizable task-input" placeholder={task ? task.description : ""}
                            onBlur={handleDescriptionSubmit}
                            />
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const Task = ({task} : {task: ITask}) => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <div>
            <button className="btn task-name" onClick={() => {setModal(1)}}>
                {task.name}
            </button>
            <GlobalModal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={TaskModal} task={task}></GlobalModal>
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