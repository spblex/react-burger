import React, {FC, useEffect} from "react";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {WebsocketStatus} from "../../../../types/stores";
import {PreLoader} from "../../pre-loader/pre-loader";
import {ErrorGeneral} from "../../../../pages/error-general/error-general";
import {TOrderHistoryProps} from "../../../../types/props";
import style from "./order-list.module.css";
import {Link, useLocation} from "react-router-dom";
import {wsConnect, wsDisconnect} from "../../../../services/ws-actions";
import {OrderListItem} from "../order-list-item/order-list-item";

export const OrderList: FC<TOrderHistoryProps> = ({personal}) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {status, data} = useAppSelector((store) => store.feed);
    const orders = [...data.orders];

    useEffect(() => {
        dispatch(wsConnect({
            url: personal ? process.env.REACT_APP_WSS_ORDERS_PERSONAL! : process.env.REACT_APP_WSS_ORDERS_ALL!,
            useToken: true
        }));

        return () => {
            dispatch((wsDisconnect()));
        }
    }, [dispatch, personal]);

    if (status === WebsocketStatus.CONNECTING) {
        return (
            <PreLoader/>
        )
    }

    if (status === WebsocketStatus.ERROR) {
        return (
            <ErrorGeneral message='Что-то пошло не так..'/>
        )
    }

    const linkPath = personal ? '/profile/orders/' : '/feed/';

    return (
        <div className={style.main}>
            <main className={style.view}>
                {
                    orders.sort((a, b) => {
                        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
                    })
                        .map((value) => {
                            return (
                                <Link className={style.link} key={value.number} to={linkPath + value.number}
                                      state={{background: location}}>
                                    <OrderListItem order={value}/>
                                </Link>
                            )
                        })
                }
            </main>
        </div>
    )
}