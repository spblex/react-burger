import style from "./navigation.module.css";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FC, useCallback} from "react";
import {logout} from "../../../../utils/api-service";
import {getCookie} from "../../../../utils/cookie";
import {TResponse} from "../../../../types/api-types";

export const Navigation: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = useCallback((): void => {
        // @ts-ignore
        dispatch(logout({ token: getCookie('refreshToken') }))
            .then((result: TResponse) => {
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
                    <Link className={style.link} onClick={onLogout} to='/'>Выход</Link>
                </li>
            </ul>
            <p className={style.description}>В этом разделе вы можете<br/>изменить свои персональные данные</p>
        </div>
    );
}