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
const TMName = ({closeButton: CloseButton}) => {
    return (
        <div style={{position: 'relative', height: '50px', width: '30px', background: 'yellow'}}>
            {CloseButton}
        </div>
    )
}

const TMDescription = ({closeButton: CloseButton}) => {
    return (
        <div style={{position: 'relative', height: '50px', width: '50px', background: 'yellow'}}>
            {CloseButton}
        </div>
    )
}

const TMCategories = ({closeButton: CloseButton}) => {
    return (
        <div style={{position: 'relative'}}>
            {CloseButton}
        </div>
    )
}

const TMDate = ({closeButton: CloseButton}) => {
    return (
        <div style={{position: 'relative'}}>
            {CloseButton}
        </div>
    )
}

const TMDelete = ({closeButton: CloseButton}) => {
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
                <OpenButton onClick={() => setModal(1)} component={() => {return (<div style={{width: '75px', height: '50px', background: 'purple'}}/>)}}/>
                <button onClick={() => {setModal(2)}}>
                    <div style={{width: '75px', height: '50px', background: 'green'}}></div>
                </button>
                <button onClick={() => {setModal(3)}}>
                    <div style={{width: '75px', height: '50px', background: 'yellow'}}></div>
                </button>
            </div>
            <Modal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={TMName}></Modal>
            <Modal modalNumber={2} isOpen={selectedModal} onClose={closeModal} component={TMDelete}></Modal>
            <Modal modalNumber={3} isOpen={selectedModal} onClose={closeModal} component={TMDescription}></Modal>
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
