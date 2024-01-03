import style from "./navigation.module.css";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {logout} from "../../../../utils/api-service";
import {getCookie} from "../../../../utils/cookie";

export default function Navigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = useCallback(() => {
        dispatch(logout({ token: getCookie('refreshToken') }))
            .then((result) => {
                if (!result.error) {
                    navigate('/login', {replace: false});
                }
            });
    }, [dispatch, navigate]);

    return (
        <div className={style.content}>
            <ul className={style.list}>
                <li className={style.item}>
                    <NavLink className={({isActive}) => isActive ? style.activeLink : style.link} to='/profile/user'>Профиль</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={({isActive}) => isActive ? style.activeLink : style.link}  to='/profile/orders'>История заказов</NavLink>
                </li>
                <li className={style.item}>
                    <Link className={style.link} onClick={onLogout}>Выход</Link>
                </li>
            </ul>
            <p className={style.description}>В этом разделе вы можете<br/>изменить свои персональные данные</p>
        </div>
    );
}