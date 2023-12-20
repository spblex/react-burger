import React, {forwardRef} from 'react';
import style from './card-section.module.css';
import Card from "../card/card";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {extractIngredientsByType} from "../../../../services/selectors";

const CardSection = forwardRef((props, ref) => {
    const {title, name} = props;
    const {[name]: ingredients} = useSelector(extractIngredientsByType);

    return (
        <div ref={ref} title={name}>
            <p className={style.title}>{title}</p>
            <div className={style.main} >
            {
                ingredients.map((item) => {
                    return (
                        <Card key={item._id} ingredient={item}/>
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
    name: PropTypes.string.isRequired
}