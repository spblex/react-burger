import React, {useCallback, useMemo, useState} from 'react';
import style from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardSection from "../card-section/card-section";
import Modal from "../../../dialog/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import ingredientsTypes from "../../../../utils/types";

export default function BurgerIngredients ({ingredients}) {
    const [currentTab, setCurrentTab] = useState('buns');
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const {buns, sauces, main} = useMemo(() => {
        return {
            buns: ingredients.filter(item => item.type === 'bun'),
            sauces: ingredients.filter(item => item.type === 'sauce'),
            main: ingredients.filter(item => item.type === 'main')
        };
    }, [ingredients]);

    const onModalClose = useCallback(() => {
            setSelectedIngredient(null);
        }, []
    );

    return (
        <div className={style.main}>
            <p className={style.title}>Соберите Бургер</p>
            <div className={style.tab}>
                <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
                    Булки
                </Tab>
                <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>
                    Соусы
                </Tab>
                <Tab value="mains" active={currentTab === 'mains'} onClick={setCurrentTab}>
                    Начинки
                </Tab>
            </div>
            <section className={style.card_sections}>
                {
                    buns.length > 0 && (
                        <CardSection key='buns' title='Булки' ingredients={buns} onSelectIngredient={setSelectedIngredient}/>
                    )
                }
                {
                    sauces.length > 0 && (
                        <CardSection key='sauces' title='Соусы' ingredients={sauces} onSelectIngredient={setSelectedIngredient}/>
                    )
                }
                {
                    main.length > 0 && (
                        <CardSection key='mains' title='Начинки' ingredients={main} onSelectIngredient={setSelectedIngredient}/>
                    )
                }
            </section>
            {
                selectedIngredient && (
                    <Modal title="Детали ингредиента" onClose={onModalClose}>
                        <IngredientDetails ingredient={selectedIngredient}/>
                    </Modal>
                )
            }
        </div>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsTypes.isRequired).isRequired
}