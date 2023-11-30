import React from 'react';
import style from './card-section.module.css';
import Card from "../card/card";
import PropTypes from "prop-types";
import ingredientsTypes from "../../../../utils/types";

export default function CardSection ({title, ingredients, onSelectIngredient}) {

    return (
        <div>
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
}

CardSection.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsTypes.isRequired).isRequired,
    onSelectIngredient: PropTypes.func.isRequired
}