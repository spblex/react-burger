import React, {FC} from 'react';
import style from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";

export const AppHeader: FC = () => {
    const {user} = useAppSelector(store => store.auth);
    const nickname = user.name === "" ? "Войти" : user.name;
    return (
        <header className={style.main_area}>
            <div className={style.content}>
                <nav className={style.nav}>
                    <div className={style.button_constructor}>
                        <div className={style.button_icon}>
                            <BurgerIcon type="primary"/>
                        </div>
                        <NavLink className={({isActive}) => isActive ? style.activeLink : style.inactiveLink} to='/'>Конструктор</NavLink>
                    </div>
                    <div className={style.button_orders}>
                        <div className={style.button_icon}>
                            <ListIcon type="secondary"/>
                        </div>
                        <NavLink className={({isActive}) => isActive ? style.activeLink : style.inactiveLink} to='/feed'>Лента заказов</NavLink>
                    </div>
                    <div className={style.button_settings}>
                        <div className={style.button_icon}>
                            <ProfileIcon type="secondary"/>
                        </div>
                        <NavLink className={({isActive}) => isActive ? style.activeLink : style.inactiveLink} to='/profile/user'>{nickname}</NavLink>
                    </div>
                </nav>
                <div className={style.logo}>
                    <Logo />
                </div>
            </div>
        </header>
    );
}