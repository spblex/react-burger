import React, {FC} from "react";
import {TOrderListItemProps} from "../../../../types/props";
import style from "./order-list-item.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {getOrderIngredients} from "../../../../services/selectors";

export const OrderListItem: FC<TOrderListItemProps> = ({order}) => {
    const ingredients = useAppSelector((state) => getOrderIngredients(state, order?.ingredients));
    const items = ingredients.slice(0, 6).reverse();

    const getTotalPrice = () => {
        return ingredients.reduce((total, ingredient) => total + ingredient.price, 0);
    }

    return (
        <div className={style.view}>
            <div className={style.number_container}>
                <p className={style.number}>#{order.number}</p>
                <FormattedDate className={style.date} date={new Date(order.createdAt)}/>
            </div>
            <p className={style.name}>{order.name}</p>
            <div className={style.list_container}>
                <ul className={style.list}>
                    {
                        items.map((ingredient, index) => (
                            <li className={style.image_container} key={index} style={{
                                left: `${(items.length - index - 1) * 50}px`
                            }}>
                                {
                                    (index === 0 && ingredients.length > 6 && (
                                        <p className={style.image_number}>+{ingredients.length - 5}</p>
                                    ))
                                    || (
                                        <img className={style.image} src={ingredient.image_mobile} alt={ingredient.name}/>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
                <div className={style.price}>
                    <p className={style.total}>{getTotalPrice()}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}