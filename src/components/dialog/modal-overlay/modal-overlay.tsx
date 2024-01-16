import React, {FC} from "react"
import style from './modal-overlay.module.css';
import {TModalOverlayProps} from "../../../types/props";


export const ModalOverlay: FC<TModalOverlayProps> = ({children, onClose}) => {

    return (
        <div className={style.main} onClick={onClose}>
            {children}
        </div>
    )
}