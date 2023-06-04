import React, { useState } from "react";
import Button from '../components/TestButton'
import '../styles/tab.css'
import { Task } from '../components/Task'
import { Modal } from '../components/Modal'

export const Home = () => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    const data =[{"name":"test1"},{"name":"test2"}];
    const listItems = data.map((d) => <Button name={d.name}/>);

    return (
        <div id="container">
            <div id="scroller">
                <button onClick={() => {setModal(1)}}>modal zebi</button>
                <button onClick={() => {setModal(2)}}>modal zebi</button>
                <div style={{height: '300px', width: '300px', background: 'white'}}></div>
                <Modal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={() => {return (<div style={{height: '300px', width: '300px', background: 'white'}}></div>)}}></Modal>
                <Modal modalNumber={2} isOpen={selectedModal} onClose={closeModal} component={() => {return (<div style={{height: '300px', width: '300px', background: 'black'}}></div>)}}></Modal>
                <Task></Task>
            </div>
            <div id="scroller">
                {listItems}
            </div>
        </div>
    );
}
