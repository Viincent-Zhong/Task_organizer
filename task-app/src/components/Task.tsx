import React, { useState } from "react";
import { GlobalModal, Modal, OpenButton } from '../components/Modal'

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

export const Task = () => {
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    return (
        <div style={{position: 'relative'}}>
            <button onClick={() => {setModal(1)}}>
                {/* mettre la task */}
                <div style={{width: '300px', height: '600px', background: 'blue'}}></div>
            </button>
            <GlobalModal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={TaskModal}></GlobalModal>
        </div>
    );
}

export const TaskCreator = () => {
    return (
        <div>
            <input className="form" placeholder={"+ Add a task"}
            />
        </div>
    )
}