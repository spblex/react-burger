import {TAuthStore, TBurgerIngredientsStore, TUser} from "./stores";

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH'
};

export type TTokenData = {
    readonly token: string | null;
};

export type TResponse = {
    readonly success: boolean;
    readonly error?: {
        readonly message: string;
    }
};

export type TTokenResponse = TResponse & {
    readonly accessToken: string;
    readonly refreshToken: string;
};

export type TLoadIngredientsResponse = TResponse & TBurgerIngredientsStore;

export type TLoginResponse = TAuthStore & TTokenResponse;
export type TRegisterResponse = TLoginResponse;

export type TOrderData = {
    readonly ingredients: Array<string>;
};

export type TUserBaseData = {
    readonly name: string;
    readonly email: string;
};

export type TUserData = TUserBaseData & {
    readonly password: string;
};

export type TPasswordResetData = TTokenData & {
    readonly password: string;
};

export type TUserResponse = {
    readonly user: TUser;
};

export type TOrderResponse = TResponse & {
    readonly name: string;
    readonly order: {
        readonly number: number;
    };
}