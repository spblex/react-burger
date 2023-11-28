import style from './ingredient-details.module.css'
import ingredientsTypes from "../../../../utils/types";

export default function IngredientDetails ({ingredient}) {
    return (
        <>
            <img className={style.image} src={ingredient.image_large} alt=""/>
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

IngredientDetails.propTypes = {
    ingredient: ingredientsTypes.isRequired
}