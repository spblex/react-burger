import React, {useMemo, useState} from 'react';
import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../dialog/modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import ingredientsTypes from "../../../../utils/types";

export default function BurgerConstructor ({ingredients}) {
    const [isModalOpened, setIsModalOpened] = useState(false);

    const {bun, nonBuns} = useMemo(() => {
        return {
            bun: ingredients.find(item => item.type === 'bun'),
            nonBuns: ingredients.filter(item => item.type !== 'bun')
        };
    }, [ingredients]);

    const {sum} = React.useMemo(() => {
        return {
            sum: ingredients.reduce((accumulator, item) => {
                return { price: accumulator.price + item.price };
            })
        }
    }, [ingredients]);

    return (
        <div className={style.main}>
            <div className={style.item_top}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={style.item_element}
                />
            </div>
            <ul className={style.ingredients}>
                {nonBuns.map((item, index) => {
                    return (
                        <li className={style.item} key={index}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                    extraClass={style.item_element}
                            />
                        </li>
                    );
                })}
            </ul>
            <div className={style.item_bottom}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={style.item_element}
                />
            </div>
            <div className={style.order}>
                <p className={style.sum}>{sum.price}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium" extraClass={style.button} onClick={() => { setIsModalOpened(true) }}>
                    Оформить заказ
                </Button>
            </div>
            {
                isModalOpened && (
                    <Modal onClose={() => {setIsModalOpened(false)}}>
                        <OrderDetails identifier="034536"/>
                    </Modal>
                )
            }
        </div>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsTypes.isRequired).isRequired
}