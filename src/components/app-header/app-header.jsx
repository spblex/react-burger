import React from 'react';
import style from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
    return (
        <header className={style.main_area}>
            <div className={style.content}>
                <nav className={style.nav}>
                    <div className={style.button_constructor}>
                        <div className={style.button_icon}>
                            <BurgerIcon type="primary"/>
                        </div>
                        <p className={style.button_text}>Конструктор</p>
                    </div>
                    <div className={style.button_orders}>
                        <div className={style.button_icon}>
                            <ListIcon type="secondary"/>
                        </div>
                        <p className={style.button_inactive_text}>Лента заказов</p>
                    </div>
                    <div className={style.button_settings}>
                        <div className={style.button_icon}>
                            <ProfileIcon type="secondary"/>
                        </div>
                        <p className={style.button_inactive_text}>Личный кабинет</p>
                    </div>
                </nav>
                <div className={style.logo}>
                    <Logo />
                </div>
            </div>
        </header>
    );
}