import React, { useEffect } from "react";
import { TaskTable, TableCreator } from "../components/TaskTable";
import { RootState } from '../data/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTab } from "../services/Tab";
import { getAllTask } from "../services/Task";
import { ITabSlice, sliceAddManyTab } from '../data/tabSlice'
import { addManyTaskToSlice } from "../data/task";

export const Home = () => {
    const itabs = useSelector((state: RootState) => state.tab);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            getAllTab().then(tabs => {
                dispatch(sliceAddManyTab(tabs))

                getAllTask().then(tasks => {
                    console.log(tasks)
                    addManyTaskToSlice({dispatch, tabs, tasks})
                })
            })
        } catch (error) {
        // popup
        }
    }, []);

    return (
        <div className="home-bg" id="kanban-board">
            <div className="container-fluid">
                <div className="row">
                {itabs.map((itab: ITabSlice, index: number) => (
                    <TaskTable key={itab.tab._id} itab={itab} modalNumber={index + 1}/>
                ))}
                <TableCreator/>
                </div>
            </div>
        </div>
    );
}
