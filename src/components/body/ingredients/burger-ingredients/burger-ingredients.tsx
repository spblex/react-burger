import React, {FC, UIEvent, useCallback, useRef, useState} from 'react';
import style from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {CardSection} from "../card-section/card-section";


const SCROLL_OFFSET = 10;

export const BurgerIngredients: FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('buns');
    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);

    const onTabClick = useCallback((value: string): void => {
        setCurrentTab(value);
        switch (value) {
            case 'buns':
                bunsRef.current?.scrollIntoView({ behavior: "smooth" });
                break;
            case 'sauces':
                saucesRef.current?.scrollIntoView({ behavior: "smooth" });
                break;
            case 'mains':
                mainsRef.current?.scrollIntoView({ behavior: "smooth" });
                break;
        }
    }, []);

    const onSectionScroll = useCallback((e: UIEvent<HTMLDivElement>): void => {
        const {top} = e.currentTarget.getBoundingClientRect();
        [bunsRef, saucesRef, mainsRef].forEach((section) => {
            if (section.current) {
                const {top: sectionTop, bottom: sectionBottom} = section.current.getBoundingClientRect();
                if (sectionTop - top - SCROLL_OFFSET <= 0 && sectionBottom - top > 0) {
                    setCurrentTab(section.current.title);
                }
            }
        });
    }, []);

    return (
        <div className={style.main}>
            <p className={style.title}>Соберите Бургер</p>
            <div className={style.tab}>
                <Tab value='buns' active={currentTab === 'buns'} onClick={onTabClick}>
                    Булки
                </Tab>
                <Tab value='sauces' active={currentTab === 'sauces'} onClick={onTabClick}>
                    Соусы
                </Tab>
                <Tab value='mains' active={currentTab === 'mains'} onClick={onTabClick}>
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