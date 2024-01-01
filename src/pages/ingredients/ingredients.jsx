import IngredientDetails from "../../components/body/ingredients/ingredient-details/ingredient-details";
import React from "react";
import style from "./ingredients.module.css";

export default function Ingredients() {
    return (
        <div className={style.main}>
            <IngredientDetails/>
        </div>
    )
}