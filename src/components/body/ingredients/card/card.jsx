import React, {useCallback} from 'react';
import style from './card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {selectIngredient} from "../../../../services/burger-ingredients";

export default function Card ({ingredient}) {
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        dispatch(selectIngredient(ingredient));
    }, [dispatch, ingredient]);

    return (
        <div className={style.main} onClick={onClick}>
            {
                (ingredient._id === '643d69a5c3f7b9001cfa093c' ||
                ingredient._id === '643d69a5c3f7b9001cfa0944') && (
                    <Counter count={1} size="default" extraClass={style.counter}/>
                )
            }
            <img className={style.image} src={ingredient.image} alt="Ингредиент."/>
            <div className={style.price}>
                <p className={style.price_text}>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={style.name}>{ingredient.name}</p>
        </div>
    )
}