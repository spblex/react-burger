import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import React, {useCallback} from "react";
import {deleteIngredient} from "../../../../services/burger-constructor";
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";
import ingredientsTypes from "../../../../utils/types";
import PropTypes from "prop-types";


export default function BurgerIngredient({item, index}) {
    const dispatch = useDispatch();

    const deleteCard = useCallback((index) => {
        dispatch(deleteIngredient({index: index}));
    }, [dispatch]);

    const [, dragRef] = useDrag({
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

BurgerIngredient.propTypes = {
    item: ingredientsTypes.isRequired,
    index: PropTypes.number.isRequired
}