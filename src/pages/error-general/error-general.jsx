import style from "./error-general.module.css";
import image_error from "../../images/error_general.png";
import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

export default function ErrorGeneral({message}) {
    return (
        <div className={style.main}>
            <img className={style.image} src={image_error} alt="Ошибка"/>

            <p className={style.description}>Ошибка получения данных с сервера: {message}</p>
            <p className={style.description}>Перезагрузите страницу и повторите попытку.</p>
            <p className={style.description}>Вернуться на <Link className={style.link} to='/'>Главную</Link></p>
        </div>
    )
}

ErrorGeneral.propTypes = {
    error: PropTypes.string.isRequired
}