import React, { useState } from "react";
import { GlobalModal, noPropagation } from './Modal'
import { addTab, deleteTab, updateTabName } from '../services/Tab'
import { useDispatch } from 'react-redux';
import { ITabSlice, sliceAddTab, sliceDeleteTab, sliceUpdateTab } from '../data/tabSlice'
import { Task, TaskCreator } from "./Task";
import { ITask } from "../services/Task";

const TableModifierModal = ({closeButton: CloseButton, tab}) => {
    const dispatch = useDispatch();

    // Updating a tab
    const handleNameSubmit = (event) => {
        const inputValue = event.target.value;
        event.stopPropagation();
        // Setted new name
        if (tab && inputValue.trim().length > 0 && tab.name !== inputValue) {
            try {
                if (tab._id) {
                    updateTabName(tab._id, inputValue).then(() => {
                        dispatch(sliceUpdateTab({
                            ...tab,
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

    // Deleting a tab
    const handleDelete = (event) => {
        event.stopPropagation();
        if (tab && tab._id) {
            try {
                deleteTab(tab._id).then(() => {
                    dispatch(sliceDeleteTab(tab._id))
                })
            } catch (error) {
                // popup
            }
        }
    }

    return (
        <div className="container tab">
            <div className="col flex-column">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body tab">
                            <input className="form" placeholder={tab ? tab.name : ""}
                            onBlur={handleNameSubmit}
                            />
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const TaskTable = ({itab, modalNumber} : { itab: ITabSlice, modalNumber: number }) => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <div className="col-sm-1 col-md-1 col-lg-1">
            <div className="tab-parent">
                <button type="button" className="btn tab-name" onClick={() => noPropagation(setModal(modalNumber))}>{itab.tab.name}</button>
                <div className="tab-bg-parent scroller">
                    {itab.tasks.map((task: ITask, index: number) => (
                        <Task key={index} task={task}/>
                    ))}
                    <TaskCreator parentTab={itab}/>
                    <GlobalModal modalNumber={modalNumber} isOpen={selectedModal} onClose={closeModal} component={TableModifierModal} tab={itab.tab}></GlobalModal>
                </div>
            </div>
        </div>
    )
}

export const TableCreator = () => {
    const dispatch = useDispatch();
    const createTab = (event) => {
        const inputValue = event.target.value;
        event.stopPropagation();
        if (inputValue.trim().length > 0) {
            try {
                // API call
                addTab({name: inputValue}).then(newTab => {
                    dispatch(sliceAddTab(newTab))
                })
                event.target.value = ''; // Clear input value
            } catch (error) {
                // popup
            }
        }
    }

    return (
        <div className="col-sm-1 col-md-1 col-lg-1">
            <div className="card-body tab">
                <input className="form" placeholder={"+ Add a table"}
                onBlur={createTab}
                />
            </div>
        </div>
    )
}