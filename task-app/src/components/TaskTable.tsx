import React, { useState } from "react";
import { GlobalModal, noPropagation } from './Modal'
import { ITab } from "../services/Tab";
import { addTab, deleteTab, updateTabName } from '../services/Tab'
import { useDispatch, useSelector } from 'react-redux';
import { sliceAddTab, sliceDeleteTab, sliceUpdateTab } from '../data/tabSlice'
import { TaskCreator } from "./Task";

const TableModifierModal = ({closeButton: CloseButton, tab, setTab, delTab}) => {
    const handleNameSubmit = (event) => {
        const inputValue = event.target.value;
        event.stopPropagation();
        // Creating a new tab
        if (!tab && inputValue.trim().length > 0) {
            try {
                var newTab: ITab = {
                    name: inputValue
                }
                addTab(newTab)
                setTab(newTab)
            } catch (error) {
                // popup
            }
            return;
        }
        // Updating a tab name
        if (tab && tab.name !== inputValue) {
            try {
                if (tab.id)
                    updateTabName(tab.id, tab.name)
                setTab({
                    ...tab,
                    name: inputValue
                })
            } catch (error) {
                // popup
            }
        }
    }

    // Deleting a tab
    const handleDelete = (event) => {
        event.stopPropagation();
        if (tab && tab.id) {
            try {
                deleteTab(tab.id)
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

export const TaskTable = ({tab} : { tab: ITab }) => {
    // button avec le name -> modal : rename, supprimer
    return (
        <div className="col-sm-1 col-md-1 col-lg-1 tab-name">
            <button type="button" className="btn btn-primary btn-lg btn-block">{tab.name}</button>
            <TaskCreator/>
        </div>
    )
}

export const TableCreator = () => {
    const dispatch = useDispatch();
    const createTab = (event) => {
        const inputValue = event.target.value;
        event.stopPropagation();
        var newTab : ITab = {
            name: inputValue
        }
        
        if (inputValue.trim().length > 0) {
            try {
                // addTab(newTab) // call API
                dispatch(sliceAddTab(newTab))
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