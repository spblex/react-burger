import style from "./home.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/body/ingredients/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/body/order/burger-constructor/burger-constructor";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadIngredients} from "../../utils/api-service";

export default function Home() {
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
        <div className={style.view}>
            <main className={style.content}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </div>
    )
}