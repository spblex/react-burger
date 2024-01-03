import React, {useCallback, useEffect} from 'react';
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import style from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal({children, onClose, title=null}) {

    const modalRoot = document.getElementById("react-modals");

    const onKeydown = useCallback((e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }, [onClose]
    );

    const onChildrenClick = (e) => {
        e.stopPropagation();
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeydown);

        return () => {
            document.removeEventListener('keydown', onKeydown)
        }
    }, [onKeydown]);

    return createPortal(
        (
            <ModalOverlay onClose={onClose}>
                <div className={style.children} onClick={onChildrenClick}>
                    <div className={style.title_container}>
                        <p className={style.title_text}>{title}</p>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                    {children}
                </div>
            </ModalOverlay>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
}