import {rootReducer} from "../services/root-reducer";

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniqueId?: string;
};

export type TIngredientTypes = {
    buns: Array<TIngredient>;
    sauces: Array<TIngredient>;
    mains: Array<TIngredient>;
};

export type TRootReducer = ReturnType<typeof rootReducer>;

export type TStoreState = {
    loading: boolean;
    success: boolean;
    error: string | null;
};

export type TBurgerConstructorStore = {
    bun: TIngredient | null;
    ingredients: Array<TIngredient>;
    sum: number;
};

export type TBurgerIngredientsStore = TStoreState & {
    data: Array<TIngredient>;
};

export type TOrderDetailsStore = TStoreState & {
    name: string | null;
    number: number;
};

export type TPasswordStore = TStoreState;

export type TUser = {
    name: string;
    email: string;
};

export type TAuthStore = Omit<TStoreState, 'success'> & {
    isAuth: boolean;
    user: TUser;
};