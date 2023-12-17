import React from 'react';
import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../dialog/modal/modal";
import OrderDetails from "../order-details/order-details";
import {useModal} from "../../../../hooks/useModal";
import {useSelector} from "react-redux";
import {extractBuns, extractNonBuns} from "../../../../services/selectors";

export default function BurgerConstructor () {
    const {data: ingredients} = useSelector(store => store.ingredients);
    const bun = useSelector(extractBuns);
    const nonBuns = useSelector(extractNonBuns);
    const {isModalOpen, openModal, closeModal} = useModal();

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
                <Button htmlType="button" type="primary" size="medium" extraClass={style.button} onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {
                isModalOpen && (
                    <Modal onClose={closeModal}>
                        <OrderDetails identifier="034536"/>
                    </Modal>
                )
            }
        </div>
    );
}