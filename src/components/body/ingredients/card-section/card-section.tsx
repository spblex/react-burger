import React, {forwardRef} from 'react';
import style from './card-section.module.css';
import {Card} from "../card/card"
import {useSelector} from "react-redux";
import {extractIngredientsByType} from "../../../../services/selectors";
import {TCardSectionProps} from "../../../../types/props";
import {TIngredient, TIngredientTypes, TRootReducer} from "../../../../types/stores";

export const CardSection = forwardRef<HTMLDivElement, TCardSectionProps>(({title, name}, ref) => {
    const {[name]: ingredients} = useSelector<TRootReducer, TIngredientTypes>(extractIngredientsByType);

    return (
        <div ref={ref} title={name}>
            <p className={style.title}>{title}</p>
            <div className={style.main} >
            {
                ingredients.map((item: TIngredient) => {
                    return (
                        <Card key={item._id} ingredient={item}/>
                    )
                })
            }
            </div>
        </div>
    )
});