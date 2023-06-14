import React from "react";
import Button from '../components/TestButton'
import '../styles/tab.css'
import { Task } from '../components/Task'
import { TableCreator } from "../components/TaskTable";

export const Home = () => {
    const data =[{"name":"test1"},{"name":"test2"}];
    const listItems = data.map((d) => <Button name={d.name}/>);

    return (
        <div id="kanban-board">
            <TableCreator></TableCreator>
            {/* <div id="scroller">
            </div>
                <Task></Task>
            <div id="scroller">
                {listItems}
            </div> */}
        </div>
    );
}
