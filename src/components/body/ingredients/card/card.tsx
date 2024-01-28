import React, {FC} from 'react';
import style from './card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {calculateIngredientCount} from "../../../../services/selectors";
import {Link, useLocation} from "react-router-dom";
import {TCardProps} from "../../../../types/props";
import {TDragObject} from "../../../../types/types";
import {useAppSelector} from "../../../../hooks/useAppSelector";

export const Card: FC<TCardProps> = ({ingredient}) => {
    const location = useLocation();
    const itemCount = useAppSelector((state) => calculateIngredientCount(state, ingredient._id));

    const [, dragRef] = useDrag<TDragObject>({
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