import React from "react";
import Button from '../components/TestButton'
import '../styles/tab.css'
import { Task } from '../components/Task'

export const Home = () => {
    const data =[{"name":"test1"},{"name":"test2"}];
    const listItems = data.map((d) => <Button name={d.name}/>);

    return (
        <div id="container">
            <div id="scroller">
                <Task></Task>
            </div>
            <div id="scroller">
                {listItems}
            </div>
        </div>
    );
}
