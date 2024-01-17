import {Link} from "react-router-dom";
import style from "./not-found-404.module.css";
import image_404 from "../../images/error_404.png";
import {FC} from "react";

export const NotFound404: FC = () => {
    return (
        <div className={style.main}>
            <img className={style.image} src={image_404} alt="Страница на найдена"/>
            <p className={style.description}>Вернуться на <Link className={style.link} to='/'>Главную</Link></p>
        </div>
    )
}