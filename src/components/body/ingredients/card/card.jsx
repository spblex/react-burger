import React from 'react';
import style from './card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {calculateIngredientCount} from "../../../../services/selectors";
import ingredientsTypes from "../../../../utils/types";
import {Link, useLocation} from "react-router-dom";

export default function Card ({ingredient}) {
    const location = useLocation();
    const itemCount = useSelector((state) => calculateIngredientCount(state, ingredient._id));
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {
            adding: true,
            ingredient: ingredient,
            index: 0
        }
    });

    return (
        <Link className={style.main} ref={dragRef} to={`/ingredients/${ingredient._id}`} state={{background: location}}>
            { itemCount !== 0 && (
                <Counter count={itemCount} size="default" extraClass={style.counter}/>
            )}
            <img className={style.image} src={ingredient.image} alt="Ингредиент."/>
            <div className={style.price}>
                <p className={style.price_text}>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={style.name}>{ingredient.name}</p>
        </Link>
    )
}

Card.propTypes = {
    ingredient: ingredientsTypes.isRequired
}