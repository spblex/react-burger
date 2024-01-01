import React, {useCallback, useRef, useState} from 'react';
import style from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardSection from "../card-section/card-section";


const SCROLL_OFFSET = 10;

export default function BurgerIngredients () {
    const [currentTab, setCurrentTab] = useState('buns');
    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    const scrollToSection = useCallback((ref) => {
        ref.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, []);

    const onTabClick = useCallback(({tab, ref}) => {
        setCurrentTab(tab);
        scrollToSection(ref);
    }, [scrollToSection]);

    const onSectionScroll = useCallback((e) => {
        const {top} = e.currentTarget.getBoundingClientRect();
        [bunsRef, saucesRef, mainsRef].forEach((section) => {
            const {top: sectionTop, bottom: sectionBottom} = section.current.getBoundingClientRect();
            if (sectionTop - top - SCROLL_OFFSET <= 0 && sectionBottom - top > 0) {
                setCurrentTab(section.current.title);
            }
        });
    }, []);

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
                <CardSection key='buns' name='buns' title='Булки' ref={bunsRef}/>
                <CardSection key='sauces' name='sauces' title='Соусы' ref={saucesRef}/>
                <CardSection key='mains' name='mains' title='Начинки' ref={mainsRef}/>
            </section>
        </div>
    );
}