import style from './profile.module.css'
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {logout} from "../../utils/api-service";

export default function Profile () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data} = useSelector((store) => store.auth);

    const onLogout = useCallback(() => {
        dispatch(logout({ token: data.refreshToken }))
            .then((result) => {
                if (!result.error) {
                    navigate('/login', {replace: false});
                }
            });
    }, [dispatch, navigate, data.refreshToken]);

    return (
        <div className={style.view}>
            <main className={style.main}>
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
                    <Outlet/>
                </div>
            </main>
        </div>
    )
}