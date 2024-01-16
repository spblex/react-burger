import style from "./home.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../../components/body/ingredients/burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../../components/body/order/burger-constructor/burger-constructor";
import React, {FC} from "react";

export const Home: FC = () => {
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