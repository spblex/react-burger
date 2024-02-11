import React, {FC, useCallback, useEffect, MouseEvent} from 'react';
import {createPortal} from "react-dom";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import style from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TModalProps} from "../../../types/props";

export const Modal: FC<TModalProps> = ({children, onClose}) => {

    const modalRoot = document.getElementById("react-modals");

    const onKeydown = useCallback((e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }, [onClose]
    );

    const onChildrenClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeydown);

        return () => {
            document.removeEventListener('keydown', onKeydown)
        }
    }, [onKeydown]);

    return modalRoot ? createPortal(
        (
            <ModalOverlay onClose={onClose}>
                <div className={style.children} onClick={onChildrenClick}>
                    <div className={style.close_icon}>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                    {children}
                </div>
            </ModalOverlay>
        ),
        modalRoot
    ) : null;
}