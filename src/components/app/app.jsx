import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../body/ingredients/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../body/order/burger-constructor/burger-constructor";
import {loadIngredients} from "../../utils/api-service";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export default function App() {
    const dispatch = useDispatch();
    const {loading, error, success} = useSelector(store => store.ingredients);

    useEffect(() => {
        dispatch(loadIngredients())
    }, [dispatch]);

    if (loading) {
        return <h2>Загрузка...</h2>;
    } else if (error || !success) {
        return (
            <>
                <p>Ошибка получения данных с сервера: {error}</p>
                <p>Перезагрузите страницу и повторите попытку.</p>
            </>
        )
    }

    return (
        <div id="react-modals">
            <AppHeader/>
            <div className={style.view}>
                <main className={style.content}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </main>
            </div>
        </div>
    )
}
