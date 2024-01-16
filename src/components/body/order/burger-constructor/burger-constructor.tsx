import React, {FC, useCallback, useRef} from 'react';
import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../../../dialog/modal/modal";
import {OrderDetails} from "../order-details/order-details";
import {useModal} from "../../../../hooks/useModal";
import {useDispatch, useSelector} from "react-redux";
import {DropTargetMonitor, useDrop} from "react-dnd";
import {addBun, addIngredient, clearIngredients, moveIngredient} from "../../../../services/burger-constructor";
import {calculateIngredientSum} from "../../../../services/selectors";
import {BurgerIngredient} from "../burger-ingredient/burger-ingredient";
import {makeOrder} from "../../../../utils/api-service";
import {clearOrder} from "../../../../services/order-details";
import uuid from "react-uuid";
import {useNavigate} from "react-router-dom";
import {TAuthStore, TBurgerConstructorStore, TOrderDetailsStore, TRootReducer} from "../../../../types/stores";
import {TDragObject} from "../../../../types/types";

type TCalcDropPosition = (monitor: DropTargetMonitor<TDragObject>) => number;
type TDropCollectedProps = {
    isHover: boolean;
};

export const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const {bun, ingredients} = useSelector<TRootReducer, TBurgerConstructorStore>(store => store.burger);
    const {success, loading} = useSelector<TRootReducer, TOrderDetailsStore>(store => store.order);
    const {isAuth, loading: authLoading} = useSelector<TRootReducer, TAuthStore>((store) => store.auth);
    const sum = useSelector<TRootReducer, number>(calculateIngredientSum);
    const {isModalOpen, openModal, closeModal} = useModal();
    const nonBunsRef = useRef<HTMLUListElement>(null);
    const navigate = useNavigate();

    const calcDropPosition = useCallback<TCalcDropPosition>((monitor) => {
        let position = 0;
        if (nonBunsRef && nonBunsRef.current) {
            const {top: containerTop} = nonBunsRef.current.getBoundingClientRect();
            const {y: offsetY} = monitor.getClientOffset() ?? { y: 0 };
            let positionY = offsetY - containerTop;
            nonBunsRef.current?.childNodes.forEach(item => {
                const {height: childHeight, bottom: childBottom} = (item as HTMLLIElement).getBoundingClientRect();
                if (childBottom > containerTop) {
                    positionY -= (childHeight / 2);
                    if (positionY < 0) {
                        return position;
                    }
                    positionY -= (childHeight / 2);
                }
                position++;
            })
        }
        return position;
    }, []);

    const [{isHover}, dropTarget] = useDrop<TDragObject, unknown, TDropCollectedProps>({
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

    const onOrderClick = useCallback((): void => {
        if (isAuth) {
            if (!success && !loading && bun && ingredients.length > 0) {
                let order: Array<string> = [bun._id];
                ingredients.forEach((item) => order.push(item._id));
                order.push(bun._id);
                // @ts-ignore
                dispatch(makeOrder({ ingredients: order }));
            }
            openModal();
        } else if (!authLoading) {
            navigate('/login', {replace: false});
        }
    }, [success, loading, dispatch, bun, ingredients, openModal, authLoading, isAuth, navigate]);

    const onCloseModal = useCallback((): void => {
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
                    price={bun?.price ?? 0}
                    thumbnail={bun?.image ?? ''}
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
                    price={bun?.price ?? 0}
                    thumbnail={bun?.image ?? ''}
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