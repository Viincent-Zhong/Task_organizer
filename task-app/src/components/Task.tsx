import React, { useState } from "react";
import { GlobalModal, Modal, OpenButton } from '../components/Modal'
import { ITask, addTask } from "../services/Task";
import { ITabSlice, sliceAddTask } from "../data/tabSlice";
import { useDispatch } from "react-redux";

export const TaskHeader = () => {
    return (
        <div style={{width: '300px', height: '300px', background: 'red'}}></div>
    );
}

// Sur la task il y aura
// Champs pour rename le nom
// Champs pour changer description
// Liste des catégories
// Champs pour changer la date de début
// Champs pour changer la date de fin
// Bouton pour supprimer

const TaskName = ({closeButton: CloseButton, userID, taskName }) => {
    console.log(userID)
    return (
        <div style={{position: 'relative', height: '50px', width: '30px', background: 'yellow'}}>
            {CloseButton}
        </div>
    )
}

const TaskDescription = ({closeButton: CloseButton, userID}) => {
    return (
        <div style={{position: 'relative', height: '50px', width: '50px', background: 'yellow'}}>
            {CloseButton}
        </div>
    )
}

const TaskCategories = ({closeButton: CloseButton, userID}) => {
    return (
        <div style={{position: 'relative'}}>
            {CloseButton}
        </div>
    )
}

const TaskDate = ({closeButton: CloseButton, userID}) => {
    return (
        <div style={{position: 'relative'}}>
            {CloseButton}
        </div>
    )
}

const TaskDelete = ({closeButton: CloseButton, userID}) => {
    return (
        <div style={{position: 'relative', height: '50px', width: '500px', background: 'blue'}}>
            {CloseButton}
        </div>
    )
}

const TaskModal = ({closeButton: CloseButton}) => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <div>
            <div style={{position: 'relative', width: '400px', height: '300px', background: 'white'}}>
                {CloseButton}
                <OpenButton onClick={() => setModal(1)} component={() => {return (
                    <div style={{width: '75px', height: '50px', background: 'red'}}/>
                    )}}/>

                <OpenButton onClick={() => setModal(2)} component={() => {return (
                    <div style={{width: '75px', height: '50px', background: 'orange'}}/>
                )}}/>

                <OpenButton onClick={() => setModal(3)} component={() => {return (
                    <div style={{width: '75px', height: '50px', background: 'yellow'}}/>
                )}}/>

                <OpenButton onClick={() => setModal(4)} component={() => {return (
                    <div style={{width: '75px', height: '50px', background: 'green'}}/>
                )}}/>

                <OpenButton onClick={() => setModal(5)} component={() => {return (
                    <div style={{width: '75px', height: '50px', background: 'indigo'}}/>
                    )}}/>

                <OpenButton onClick={() => setModal(6)} component={() => {return (
                    <div style={{width: '75px', height: '50px', background: 'purple'}}/>
                    )}}/>

            </div>
            <Modal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={TaskName} userID={1} taskName={'dog'}></Modal>
            <Modal modalNumber={2} isOpen={selectedModal} onClose={closeModal} component={TaskDescription} userID={1}></Modal>
            <Modal modalNumber={3} isOpen={selectedModal} onClose={closeModal} component={TaskCategories} userID={1}></Modal>
            <Modal modalNumber={4} isOpen={selectedModal} onClose={closeModal} component={TaskDate} userID={1}></Modal>
            <Modal modalNumber={5} isOpen={selectedModal} onClose={closeModal} component={TaskDate} userID={1}></Modal>
            <Modal modalNumber={6} isOpen={selectedModal} onClose={closeModal} component={TaskDelete} userID={1}></Modal>
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
            <GlobalModal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={TaskModal}></GlobalModal>
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