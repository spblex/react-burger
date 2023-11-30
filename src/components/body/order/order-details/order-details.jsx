import style from './order-details.module.css'
import doneImage from '../../../../images/done.png'
import PropTypes from "prop-types";

export default function OrderDetails ({identifier}) {
    return (
        <div className={style.main}>
            <p className={style.identity_number}>{identifier}</p>
            <p className={style.identity_text}>идентификатор заказа</p>
            <img className={style.image} src={doneImage} alt="Заказ оформлен."/>
            <p className={style.readiness_text}>Ваш заказ начали готовить</p>
            <p className={style.target_text}>Дождитесь готовоности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    identifier: PropTypes.string.isRequired
}