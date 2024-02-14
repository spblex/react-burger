import style from "./order-details.module.css";
import doneImage from "../../../../images/done.png";
import {FC, useCallback} from "react";
import {useAppSelector} from "../../../../hooks/useAppSelector";

export const OrderDetails: FC = () => {
    const {number, success, error, loading} = useAppSelector(store => store.order);
    const {bun, ingredients} = useAppSelector(store => store.burger);

    const content = useCallback((): JSX.Element => {
        if (loading) {
            return (
                <>
                    <p className={style.status_text}>Обработка заказа</p>
                    <p className={style.identifier_text}>Пожалуйста подождите</p>
                    <div className={style.image}/>
                    <p className={style.readiness_text}>Ваш заказ начали обрабатывать</p>
                    <p className={style.target_text}>Вы первый в очереди и ваш заказ почти сформирован</p>
                </>
            )
        }
        if (!success) {
            let message = 'Положите ';
            if (!bun && !ingredients.length) {
                message += 'булочку и начинку';
            } else if (!bun) {
                message += 'булочку';
            } else if (!ingredients.length) {
                message += 'начинку'
            } else {
                message = error ?? '';
            }

            return (
                <>
                    <p className={style.status_text}>Ошибка</p>
                    <p className={style.identifier_text}>{message}</p>
                    <div className={style.image}/>
                    <p className={style.readiness_text}>Ваш заказ не был сформирован</p>
                    <p className={style.target_text}>Проверьте наличие всех компонентов и повторите заказ</p>
                </>
            )
        }

        return (
            <>
                <p className={style.identifier_number} data-test="order-number">{number}</p>
                <p className={style.identifier_text}>идентификатор заказа</p>
                <img className={style.image} src={doneImage} alt="Заказ оформлен."/>
                <p className={style.readiness_text}>Ваш заказ начали готовить</p>
                <p className={style.target_text}>Дождитесь готовоности на орбитальной станции</p>
            </>
        )
    }, [loading, success, error, number, bun, ingredients]);

    return (
        <div className={style.main}>
            {content()}
        </div>
    )
}