import React, {useEffect, useState} from 'react';
import style from './app.module.css';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../body/ingredients/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../body/order/burger-constructor/burger-constructor";

export default function App() {
    const [state, setState] = useState({
        success: false,
        data: []
    });

    useEffect(() => {
        const getIngredients = async () => {
            fetch(process.env.REACT_APP_INGREDIENTS_URI)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка ${res.status}`);
                })
                .then(data => setState(data))
                .catch(e => {
                    setState({...state, success: false, error: e});
                });
        }

        getIngredients();
    }, [state]);

    return (
        <>
            {
                state.success && (

                    <div id="react-modals">
                        <AppHeader/>
                        <div className={style.view}>
                            <main className={style.content}>
                                <BurgerIngredients ingredients={state.data}/>
                                <BurgerConstructor ingredients={state.data}/>
                            </main>
                        </div>
                    </div>
                )
            }
            {
                !state.success && (
                    <>
                        <p>Ошибка получения данных с сервера.</p>
                        <p>Перезагрузите страницу и повторите попытку.</p>
                    </>
                )
            }
        </>
    )
}
