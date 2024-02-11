import React, {FC} from "react";
import {OrderList} from "../../components/body/order/order-list/order-list";
import style from "./feed.module.css";
import {useAppSelector} from "../../hooks/useAppSelector";
import {getOrdersCooking, getOrdersReady} from "../../services/selectors";
import {Link, useLocation} from "react-router-dom";

export const Feed: FC = () => {
    const location = useLocation();
    const ordersReady = useAppSelector(state => getOrdersReady(state.feed));
    const ordersCooking = useAppSelector(state => getOrdersCooking(state.feed));
    const {total, totalToday} = useAppSelector((store) => store.feed.data);

    return (
        <div className={style.view}>
            <p className={style.header}>Лента заказов</p>
            <div className={style.panels}>
                <div className={style.panel_left}>
                    <OrderList personal={false}/>
                </div>
                <div className={style.panel_right}>
                    <div className={style.section}>
                        <div className={style.section_inner}>
                            <p className={style.header_text}>Готовы:</p>
                            <div className={style.column_ready}>

                                {
                                    ordersReady.slice(0, 10).map((value) => (
                                        <div key={value.number} >
                                            <Link className={style.order_number_ready} to={'/feed/' + value.number}
                                                  state={{background: location}}>{value.number}</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={style.section_inner}>
                            <p className={style.header_text}>В работе:</p>
                            <div className={style.column_cooking}>
                                {
                                    ordersCooking.slice(0, 10).map((value) => (
                                        <div key={value.number} >
                                            <Link className={style.order_number_cooking} to={'/feed/' + value.number}
                                                  state={{background: location}}>{value.number}</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <p className={style.header_text}>Выполнено за все время:</p>
                    <p className={style.count}>{total}</p>
                    <p className={style.header_text}>Выполнено за сегодня:</p>
                    <p className={style.count}>{totalToday}</p>
                </div>
            </div>
        </div>
    )
}