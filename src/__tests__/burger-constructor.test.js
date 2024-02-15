import {store} from "../services/store";
import {
    addBun,
    addIngredient,
    clearIngredients,
    deleteIngredient,
    moveIngredient
} from "../services/burger-constructor";

describe('Test burger-constructor', () => {

    test('burger-constructor: addBun', async () => {

        store.dispatch(addBun("test"));

        const {bun} = store.getState().burger;
        expect(bun).toEqual("test");
    })

    test('burger-constructor: addIngredient', async () => {

        store.dispatch(addIngredient({
            position: 0,
            ingredient: "test-1"
        }));

        let ingredients = store.getState().burger.ingredients;
        expect(ingredients).toEqual(["test-1"]);

        store.dispatch(addIngredient({
            position: 1,
            ingredient: "test-2"
        }));
        ingredients = store.getState().burger.ingredients;
        expect(ingredients).toEqual(["test-1", "test-2"]);

        store.dispatch(addIngredient({
            position: 0,
            ingredient: "test-0"
        }));
        ingredients = store.getState().burger.ingredients;
        expect(ingredients).toEqual(["test-0", "test-1", "test-2"]);

        store.dispatch(moveIngredient({
            newPosition: 0,
            oldPosition: 2
        }));
        ingredients = store.getState().burger.ingredients;
        expect(ingredients).toEqual(["test-2", "test-0", "test-1"]);

        store.dispatch(deleteIngredient({index: 1}));
        ingredients = store.getState().burger.ingredients;
        expect(ingredients).toEqual(["test-2", "test-1"]);

        store.dispatch(clearIngredients());
        ingredients = store.getState().burger.ingredients;
        expect(ingredients).toEqual([]);
    })
})