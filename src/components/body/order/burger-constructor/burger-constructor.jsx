import React, {useCallback, useRef} from 'react';
import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../dialog/modal/modal";
import OrderDetails from "../order-details/order-details";
import {useModal} from "../../../../hooks/useModal";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addBun, addIngredient, clearIngredients, moveIngredient} from "../../../../services/burger-constructor";
import {calculateIngredientSum} from "../../../../services/selectors";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {makeOrder} from "../../../../utils/api-service";
import {clearOrder} from "../../../../services/order-details";
import uuid from "react-uuid";
import {useNavigate} from "react-router-dom";

export default function BurgerConstructor () {
    const dispatch = useDispatch();
    const {bun, ingredients} = useSelector(store => store.burger);
    const {success, loading} = useSelector(store => store.order);
    const sum = useSelector(calculateIngredientSum);
    const {isModalOpen, openModal, closeModal} = useModal();
    const nonBunsRef = useRef();
    const navigate = useNavigate();
    const {isAuth, loading: authLoading} = useSelector((store) => store.auth);

    const calcDropPosition = useCallback((monitor) => {
        const {top: containerTop} = nonBunsRef.current?.getBoundingClientRect();
        const {y: offsetY} = monitor.getClientOffset();
        let positionY = offsetY - containerTop;
        let position = 0;
        nonBunsRef.current?.childNodes.forEach(item => {
            const {height: childHeight, bottom: childBottom} = item.getBoundingClientRect();
            if (childBottom > containerTop) {
                positionY -= (childHeight/2);
                if (positionY < 0) {
                    return position;
                }
                positionY -= (childHeight/2);
            }
            position++;
        })
        return position;
    }, []);

    const [{isHover}, dropTarget] = useDrop({
        accept: ['ingredient'],
        drop(item, monitor) {
            if (item.adding) {
                if (item.ingredient.type === 'bun') {
                    dispatch(addBun(item.ingredient));
                } else {
                    dispatch(addIngredient({
                        position: calcDropPosition(monitor),
                        ingredient: Object.assign({}, item.ingredient, {uniqueId: uuid()})
                    }));
                }
            } else {
                let newPosition = calcDropPosition(monitor);
                if (item.index < newPosition) {
                    newPosition--;
                }

                dispatch(moveIngredient({
                    newPosition: newPosition,
                    oldPosition: item.index
                }));
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const onOrderClick = useCallback(() => {
        if (isAuth) {
            if (!success && !loading && bun && ingredients.length > 0) {
                let order = [bun._id];
                ingredients.forEach((item) => order.push(item._id));
                order.push(bun._id);
                dispatch(makeOrder(order));
            }
            openModal();
        } else if (!authLoading) {
            navigate('/login', {replace: false});
        }
    }, [success, loading, dispatch, bun, ingredients, openModal]);

    const onCloseModal = useCallback(() => {
       if (success) {
           dispatch(clearIngredients());
           dispatch(clearOrder());
       }
       closeModal();
    }, [success, closeModal, dispatch]);

    return (
        <div className={isHover ? style.dragging_container : style.main} ref={dropTarget}>
            <div className={style.top_container}>

            </div>
            <div className={style.item_top}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    thumbnail={bun?.image}
                    extraClass={bun ? style.item_element : style.empty_element}
                />
            </div>
            <ul className={style.ingredients} ref={nonBunsRef}>
                {ingredients.map((item, index) => {
                    return (
                        <li className={style.item} key={item.uniqueId}>
                            <BurgerIngredient item={item} index={index}/>
                        </li>
                    );
                })}
            </ul>
            <div className={style.item_bottom}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun?.name} (низ)`}
                    price={bun?.price}
                    thumbnail={bun?.image}
                    extraClass={bun ? style.item_element : style.empty_element}
                />
            </div>

            <div className={style.order}>
                <p className={style.sum}>{sum}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium" extraClass={style.button} onClick={onOrderClick}>
                    Оформить заказ
                </Button>
            </div>
            {
                isModalOpen && (
                    <Modal onClose={onCloseModal}>
                        <OrderDetails/>
                    </Modal>
                )
            }
        </div>
    );
}