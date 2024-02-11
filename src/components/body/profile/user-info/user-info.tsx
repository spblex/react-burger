import style from "./user-info.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, FC, FormEvent, SyntheticEvent, useCallback, useState} from "react";
import {updateUserInfo} from "../../../../utils/api-service";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {TUserBaseData} from "../../../../types/api-types";

const INIT_PASSWORD = '';

type TData = {
    nickname: string,
    email: string,
    password: string
};

type TState = {
    nickname: boolean,
    email: boolean,
    password: boolean
};

export const UserInfo: FC = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(store => store.auth);
    const [data, setData] = useState<TData>({
        nickname: user.name,
        email: user.email,
        password: INIT_PASSWORD
    });

    const [error, setError] = useState<TState>({
        nickname: false,
        email: false,
        password: false
    });

    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const checkChanges = useCallback((): void => {
        let isChanged: boolean = false;
        isChanged ||= data.email !== user.email;
        isChanged ||= data.nickname !== user.name;
        setHasChanges(isChanged);
    }, [data, user]);

    const onValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });

        setError({
            ...error,
            [e.target.name]: e.target.value.length === 0
        });

        let isChanged: boolean = false;
        isChanged ||= e.target.name === 'password';
        isChanged ||= data.password !== INIT_PASSWORD;
        isChanged ||= e.target.value !== (e.target.name !== 'nickname' ? user.name : user.email);
        isChanged ||= data.email !== user.email;
        isChanged ||= data.nickname !== user.name;
        setHasChanges(isChanged);
    }, [data, error, user]);

    const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (hasChanges) {
            let changes: TUserBaseData = {
                name: data.nickname,
                email: data.email,
                password: data.password !== "" ? data.password : undefined
            };

            dispatch(updateUserInfo(changes)).then(checkChanges);
        }
    },[data, dispatch, hasChanges, checkChanges]);

    const onCancel = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        setData({
            ...data,
            nickname: user.name,
            email: user.email,
            password: INIT_PASSWORD
        });
        setHasChanges(false);
    },[data, user]);

    return (
        <form className={style.form} onSubmit={onSubmit}>
            <Input
                type='text'
                placeholder='Имя'
                onChange={onValueChange}
                value={data.nickname}
                error={error.nickname}
                errorText='Некоректное имя'
                extraClass={style.input}
                name='nickname'
                icon='EditIcon'
            />
            <Input
                type='email'
                placeholder='Логин'
                onChange={onValueChange}
                value={data.email}
                error={error.email}
                errorText='Некоректный email'
                extraClass={style.input}
                name='email'
                icon='EditIcon'
            />
            <PasswordInput
                placeholder='Пароль'
                onChange={onValueChange}
                value={data.password}
                extraClass={style.input}
                name='password'
                icon='EditIcon'
            />
            <div className={hasChanges ? style.button_container : style.hidden}>
                <Button htmlType='button' type='secondary' size='medium' extraClass={style.button} onClick={onCancel}>Отменить</Button>
                <Button htmlType='submit' type='primary' size='medium' extraClass={style.button}>Сохранить</Button>
            </div>
        </form>
    )
}