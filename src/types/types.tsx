import {TIngredient} from "./stores";

export type TDragObject = {
    adding: boolean;
    ingredient: TIngredient;
    index: number;
};

export type TKeyValue<T> = {
    [key: string]: T;
}