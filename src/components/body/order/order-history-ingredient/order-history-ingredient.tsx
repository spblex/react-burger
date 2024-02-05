import React, {FC} from "react";
import {TOrderHistoryIngredientProps} from "../../../../types/props";
import style from "./order-history-ingredient.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderHistoryIngredient: FC<TOrderHistoryIngredientProps> = ({item}) => {
    return (
      <div className={style.container}>
          <div className={style.image_container}>
            <img className={style.image} src={item.ingredient.image_mobile} alt="Ингредиент"/>
          </div>
          <p className={style.name}>{item.ingredient.name}</p>
          <div className={style.price}>
              <span className={style.total}>
                  {item.count} x {item.ingredient.price}
              </span>
              <CurrencyIcon type="primary"/>
          </div>
      </div>
    );
}