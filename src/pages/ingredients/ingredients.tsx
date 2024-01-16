import {IngredientDetails} from "../../components/body/ingredients/ingredient-details/ingredient-details";
import React, {FC} from "react";
import style from "./ingredients.module.css";

export const Ingredients : FC = () => {
    return (
        <div className={style.main}>
            <IngredientDetails/>
        </div>
    )
}