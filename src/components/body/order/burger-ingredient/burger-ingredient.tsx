import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import React, {FC, useCallback} from "react";
import {deleteIngredient} from "../../../../services/burger-constructor";
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";
import {TBurgerIngredientProps} from "../../../../types/props";
import {TDragObject} from "../../../../types/types";


export const BurgerIngredient: FC<TBurgerIngredientProps> = ({item, index}) => {
    const dispatch = useDispatch();

    const deleteCard = useCallback((index: number): void => {
        dispatch(deleteIngredient({index: index}));
    }, [dispatch]);

    const [, dragRef] = useDrag<TDragObject>({
        type: 'ingredient',
        item: {
            adding: false,
            ingredient: item,
            index: index
        }
    });

    return (
        <div className={style.item} ref={dragRef}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteCard(index)}
            />
        </div>
    )
}