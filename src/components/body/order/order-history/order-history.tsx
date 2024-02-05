import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {findOrderHistory, getOrderUniqueIngredients} from "../../../../services/selectors";
import {NotFound404} from "../../../../pages/not-found-404/not-found-404";
import {TOrderHistoryProps} from "../../../../types/props";
import {getOrder} from "../../../../utils/api-service";
import {TFeedData, TFeedOrderStatus} from "../../../../types/stores";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {PreLoader} from "../../pre-loader/pre-loader";
import style from "./order-history.module.css";
import {getOrderStatusText} from "../../../../utils/order-status";
import {OrderHistoryIngredient} from "../order-history-ingredient/order-history-ingredient";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderHistory: FC<TOrderHistoryProps> = ({personal}) => {
    const {id} = useParams<string>();
    const number = parseInt(id ?? '');
    const dispatch = useAppDispatch();
    const stateValue = useAppSelector((state) => findOrderHistory(state.feed, number));
    const [order, setOrder] = useState(stateValue);
    const [isLoading, setIsLoading] = useState(false);
    const ingredients = useAppSelector((state) => getOrderUniqueIngredients(state, order?.ingredients));


    useEffect(() => {
        if (!order) {
            setIsLoading(true);
            dispatch(getOrder(number))
                .then((response) => {
                     const result = (response.payload as TFeedData).orders.find(item => item.number === number) ?? null;
                     setOrder(result);
                    setIsLoading(false);
                });
        }
    }, [dispatch, order, number]);

    if (isLoading) {
        return (
            <PreLoader/>
        )
    } else if (!order) {
        return (
            <NotFound404/>
        )
    }

    const getTotalPrice = () => {
        return ingredients.reduce((total, item) => total + item.ingredient.price, 0);
    }

    return (
        <div className={style.container}>
            <p className={style.number}>#{order.number}</p>
            <p className={style.name}>{order.name}</p>
            <p className={order.status === TFeedOrderStatus.DONE ? style.status_done : style.status_not_done}>{getOrderStatusText(order.status)}</p>
            <p className={style.name}>Состав:</p>
            <ul className={style.list}>
                {ingredients.map((item, index) => (
                    <OrderHistoryIngredient item={item} key={index}/>
                ))}
            </ul>
            <div className={style.total}>
                <FormattedDate className={style.date} date={new Date(order.createdAt)}/>
                <div className={style.price_block}>
                    <span className={style.price}>{getTotalPrice()}</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
};