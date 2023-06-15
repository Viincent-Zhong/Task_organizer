import React from "react";
import { TaskTable, TableCreator } from "../components/TaskTable";
import { RootState } from '../data/store';
import { useSelector } from 'react-redux';
import { ITab } from "../services/Tab";

export const Home = () => {
    const tabs = useSelector((state: RootState) => state.tab);

    return (
        <div id="kanban-board">
            <div className="container-fluid bite">
                <div className="row">
                {tabs.map((tab: ITab) => (
                    <TaskTable tab={tab}/>
                ))}
                <TableCreator></TableCreator>
                </div>
            </div>
        </div>
    );
}
