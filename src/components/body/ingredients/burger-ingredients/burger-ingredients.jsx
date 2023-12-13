import React, {useCallback, useMemo, useRef, useState} from 'react';
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
    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    const {buns, sauces, mains} = useMemo(() => {
        return {
            buns: ingredients.filter(item => item.type === 'bun'),
            sauces: ingredients.filter(item => item.type === 'sauce'),
            mains: ingredients.filter(item => item.type === 'main')
        };
    }, [ingredients]);

    const onModalClose = useCallback(() => {
            setSelectedIngredient(null);
        }, []
    )

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({
            behavior: "smooth"
        });
    }

    const onTabClick = ({tab, ref}) => {
      setCurrentTab(tab);
      scrollToSection(ref);
    };

    const onSectionScroll = (e) => {
        const {top} = e.currentTarget.getBoundingClientRect();
        [bunsRef, saucesRef, mainsRef].forEach((section) => {
            const {top: sectionTop, bottom: sectionBottom} = section.current.getBoundingClientRect();
            if (sectionTop - top <= 0 && sectionBottom - top > 0) {
                setCurrentTab(section.current.title);
            }
        });
    };

    return (
        <div className={style.main}>
            <p className={style.title}>Соберите Бургер</p>
            <div className={style.tab}>
                <Tab value={{tab: "buns", ref: bunsRef}} active={currentTab === 'buns'} onClick={onTabClick}>
                    Булки
                </Tab>
                <Tab value={{tab: "sauces", ref: saucesRef}} active={currentTab === 'sauces'} onClick={onTabClick}>
                    Соусы
                </Tab>
                <Tab value={{tab: "mains", ref: mainsRef}} active={currentTab === 'mains'} onClick={onTabClick}>
                    Начинки
                </Tab>
            </div>
            <section className={style.card_sections} onScroll={onSectionScroll}>
                {
                    buns.length > 0 && (
                        <CardSection key='buns' name='buns' title='Булки' ingredients={buns} ref={bunsRef} onSelectIngredient={setSelectedIngredient}/>
                    )
                }
                {
                    sauces.length > 0 && (
                        <CardSection key='sauces' name='sauces' title='Соусы' ingredients={sauces} ref={saucesRef} onSelectIngredient={setSelectedIngredient}/>
                    )
                }
                {
                    mains.length > 0 && (
                        <CardSection key='mains' name='mains' title='Начинки' ingredients={mains} ref={mainsRef} onSelectIngredient={setSelectedIngredient}/>
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