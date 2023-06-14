import React, { useState } from "react";
import { GlobalModal, OpenButton, noPropagation } from './Modal'
import { ITab } from "../services/Tab";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../styles/emote.css'

const TableModifierModal = ({closeButton: CloseButton, setTab}: { closeButton: JSX.Element; setTab?: (tab: ITab) => void }) => {
    return (
        <div>
            <span>bite</span>
        </div>
    )
}

export const TaskTable = () => {
    // Table
}

export const TableCreator = () => {
    const [selectedModal, setModal] = useState(null)
    const [tab, setTab] = useState<ITab | null>(null)
    const closeModal = () => {
        setModal(null);
        // Créer / appel
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={() => noPropagation(setModal(1))}>
                <span className="plus">+</span> Add a table
            </button>
            <GlobalModal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={TableModifierModal} setTab={setTab}></GlobalModal>
        </div>
    )
}