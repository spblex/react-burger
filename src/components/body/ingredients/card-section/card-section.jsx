import React, {forwardRef} from 'react';
import style from './card-section.module.css';
import Card from "../card/card";
import PropTypes from "prop-types";
import ingredientsTypes from "../../../../utils/types";

const CardSection = forwardRef((props, ref) => {
    const {title, name, ingredients, onSelectIngredient} = props;

    return (
        <div ref={ref} title={name}>
            <p className={style.title}>{title}</p>
            <div className={style.main} >
            {
                ingredients.map((item) => {
                    return (
                        <Card key={item._id} ingredient={item} onSelectIngredient={onSelectIngredient}/>
                    )
                })
            }
            </div>
        </div>
    )
});

export default CardSection;

CardSection.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsTypes.isRequired).isRequired,
    onSelectIngredient: PropTypes.func.isRequired
}