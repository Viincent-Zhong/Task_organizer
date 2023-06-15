import React from "react";
import { TaskTable, TableCreator } from "../components/TaskTable";
import { RootState } from '../data/store';
import { useSelector } from 'react-redux';
import { ITab } from "../services/Tab";

import '../styles/home.css'

export const Home = () => {
    const tabs = useSelector((state: RootState) => state.tab);

    return (
        <div id="kanban-board">
            {tabs.map((tab: ITab) => (
                <TaskTable tab={tab}/>
            ))}
            <TableCreator></TableCreator>
        </div>
    );
}
