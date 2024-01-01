import {Link} from "react-router-dom";
import style from "./not-found-404.module.css";
import image_404 from "../../images/error_404.png";

export default function NotFound404() {
    return (
        <div className={style.main}>
            <img className={style.image} src={image_404} alt="Страница на найдена"/>
            <p>Вернуться на <Link to='/'>Главную</Link></p>
        </div>
    )
}