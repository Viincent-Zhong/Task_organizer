import React, { useRef, useEffect } from 'react';
import '../styles/modal.css'

/* WARNING
    The modal must have a props name closeButton

    Example:
        const modal = ({closeButton: CloseButton})

*/

/* Usage example
    const [selectedModal, setModal] = useState(null)
    const closeModal = () => {
        setModal(null);
    }

    ...

    <button className="btn btn-primary" onClick={() => noPropagation(setModal(1))}>
        <span className="plus">+</span> Add a table
    </button>
    <Modal modalNumber={1} isOpen={selectedModal} onClose={closeModal} component={TaskName}></Modal>

*/

const CloseButton = ({onClose}) => {
    const handleClose = (event) => {
        event.stopPropagation();
        onClose();
    }

    return (
        <button className="modal-close" onClick={handleClose}>X</button>
    );
} 

export const noPropagation = (onClick) => {
    const handleClick = (event) => {
        event.stopPropagation();
        onClick();
    }
    return handleClick
}

export const OpenButton = ({ component: Component, onClick, ...componentProps }) => {
    const handleClick = (event) => {
        event.stopPropagation();
        onClick();
    }

    return (
        <button onClick={handleClick}>
            <Component onClick={handleClick} {...componentProps} />
        </button>
    )
}

export const GlobalModal = ({ modalNumber, isOpen, onClose, component: Component, ...componentProps }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (isOpen !== modalNumber)
            return;
        let timeoutId = null;

        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        };

        // Set outsideClick event with a timeout of 100 milliseconds so it doesn't instant close if on open
        timeoutId = setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
        }, 100);
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [onClose, isOpen, modalNumber]);

    if (isOpen !== modalNumber) {
        return null;
    }

    return (
        <div className="modal-background">
            <div ref={ref} className="modal-container">
                <div className="modal-center">
                    <Component closeButton={<CloseButton onClose={onClose}/>} {...componentProps} />
                </div>
            </div>
        </div>
    )
}

export const Modal = ({ modalNumber, isOpen, onClose, component: Component, ...componentProps }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (isOpen !== modalNumber)
            return;
        let timeoutId = null;

        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        };

        // Set outsideClick event with a timeout of 100 milliseconds so it doesn't instant close if on open
        timeoutId = setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [onClose, isOpen, modalNumber]);

    if (isOpen !== modalNumber) {
        return null;
    }

    return (
        <div ref={ref} className="modal-container">
            <Component closeButton={<CloseButton onClose={onClose}/>} {...componentProps} />
        </div>
    )
}