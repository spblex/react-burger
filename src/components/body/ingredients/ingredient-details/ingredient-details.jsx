import style from './ingredient-details.module.css';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {findIngredient} from "../../../../services/selectors";
import NotFound404 from "../../../../pages/not-found-404/not-found-404";

export default function IngredientDetails () {
    const {id} = useParams();
    const ingredient = useSelector((state) => findIngredient(state, id));
    if (!ingredient) {
        return (
            <NotFound404/>
        )
    }
    return (
        <>
            <img className={style.image} src={ingredient.image_large} alt="Ингредиент."/>
            <p className={style.name}>{ingredient.name}</p>
            <div className={style.data}>
                <div className={style.item_container}>
                    <p className={style.item_text}>Каллории,ккал</p>
                    <p className={style.item_number}>{ingredient.calories}</p>
                </div>
                <div className={style.item_container}>
                    <p className={style.item_text}>Белки, г</p>
                    <p className={style.item_number}>{ingredient.proteins}</p>
                </div>
                <div className={style.item_container}>
                    <p className={style.item_text}>Жиры, г</p>
                    <p className={style.item_number}>{ingredient.fat}</p>
                </div>
                <div className={style.item_container}>
                    <p className={style.item_text}>Углеводы, г</p>
                    <p className={style.item_number}>{ingredient.carbohydrates}</p>
                </div>
            </div>
        </>
    )
}