import React, { useEffect } from "react";
import { TaskTable, TableCreator } from "../components/TaskTable";
import { RootState } from '../data/store';
import { useDispatch, useSelector } from 'react-redux';
import { ITab, getAllTab } from "../services/Tab";
import { sliceAddManyTab } from '../data/tabSlice'

export const Home = () => {
    const tabs = useSelector((state: RootState) => state.tab);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            getAllTab().then(tabs => {
                dispatch(sliceAddManyTab(tabs))
            })
        } catch (error) {
        // popup
        }
    }, []);

    return (
        <div id="kanban-board">
            <div className="container-fluid">
                <div className="row">
                {tabs.map((tab: ITab, index: number) => (
                    <TaskTable key={tab._id} tab={tab} modalNumber={index + 1}/>
                ))}
                <TableCreator/>
                </div>
            </div>
        </div>
    );
}
