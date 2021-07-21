import { FC, useState } from 'react';
import { createPortal } from 'react-dom'; 

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const Modal: FC = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    return createPortal(
        <div className="">
            <div className=""></div>
            <i className="fas fa-times"></i>
            <div className="">
                {children}
            </div>
        </div>,
        modalRoot
    );
}

export default Modal;
