import React, {FC} from "react"
import style from './modal-overlay.module.css';
import {TModalProps} from "../../../types/props";


export const ModalOverlay: FC<TModalProps> = ({children, onClose}) => {

    return (
        <div className={style.main} onClick={onClose}>
            {children}
        </div>
    )
}