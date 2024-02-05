import {TFeedOrder, TIngredient, TOrderIngredient} from "./stores";
import {ChangeEvent, PropsWithChildren, ReactElement} from "react";
import {ModalOverlay} from "../components/dialog/modal-overlay/modal-overlay";
import {TKeyValue} from "./types";

export type TCardSectionProps = {
    readonly title: string;
    readonly name: 'buns' | 'sauces' | 'mains';
};

export type TCardProps = {
    readonly ingredient: TIngredient;
};

export type TBurgerIngredientProps = {
    readonly item: TIngredient;
    readonly index: number;
};

export type TErrorGeneral = {
    readonly message: string;
};

export type TModalProps = PropsWithChildren & {
    readonly onClose: () => void;
}

export type TUseModal = {
    readonly isModalOpen: boolean;
    readonly openModal: () => void;
    readonly closeModal: () => void;
};

export type TWrappedComponentProps = {
    readonly onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
    readonly validate: () => boolean;
    readonly data: TKeyValue<string>;
    readonly error: TKeyValue<boolean>;
};

export type TSetCookieProps = (
    name: string,
    value: string | null,
    canExpire: boolean,
    needDelete?: boolean
) => void;

export type TGetCookieProps = (
    name: string
) => string | null;

export type TProtectedRouteBaseProps = (
    children: any
) => typeof children;

export type TProtectedRouteElementProps = TProtectedRouteBaseProps & {
    onlyUnAuth?: boolean;
};

export type TProtectedRouteDependentProps = (
    children: any,
    storeName: string,
    pageName: string
) => typeof children | any;

export type TOrderHistoryProps = {
    readonly personal: boolean;
};

export type TOrderHistoryIngredientProps = {
    readonly item: TOrderIngredient;
};

export type TOrderListItemProps = {
    readonly order: TFeedOrder;
};