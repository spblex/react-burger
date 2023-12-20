import React, {useCallback} from 'react';
import style from './card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {selectIngredient} from "../../../../services/ingredient-details";
import {useDrag} from "react-dnd";
import {calculateIngredientCount} from "../../../../services/selectors";
import ingredientsTypes from "../../../../utils/types";

export default function Card ({ingredient}) {
    const dispatch = useDispatch();
    const itemCount = useSelector((state) => calculateIngredientCount(state, ingredient._id));
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {
            adding: true,
            ingredient: ingredient,
            index: 0
        }
    });

    const onClick = useCallback(() => {
        dispatch(selectIngredient(ingredient));
    }, [dispatch, ingredient]);

    return (
        <div className={style.main} ref={dragRef} onClick={onClick}>
            { itemCount !== 0 && (
                <Counter count={itemCount} size="default" extraClass={style.counter}/>
            )}
            <img className={style.image} src={ingredient.image} alt="Ингредиент."/>
            <div className={style.price}>
                <p className={style.price_text}>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={style.name}>{ingredient.name}</p>
        </div>
    )
}

Card.propTypes = {
    ingredient: ingredientsTypes.isRequired
}