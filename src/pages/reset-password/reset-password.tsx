import style from './reset-password.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {withForm} from "../../hocs/with-form";
import {FC, FormEvent, useCallback} from "react";
import {passwordResetConfirm} from "../../utils/api-service";
import {TWrappedComponentProps} from "../../types/props";
import {TResponse} from "../../types/api-types";
import {useAppDispatch} from "../../hooks/useAppDispatch";

const ResetPasswordPage: FC<TWrappedComponentProps> = ({onValueChange, validate, data, error}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            dispatch(passwordResetConfirm({
                password: data.password,
                token: data.token
            }))
                // @ts-ignore
                .then((result: TResponse) => {
                    if (!result.error) {
                        navigate('/login', {replace: true});
                    }
                });
        }
    },[validate, dispatch, navigate, data])

    return (

        <form className={style.form} onSubmit={onSubmit}>
            <h2 className={style.title}>Востановление пароля</h2>
            <PasswordInput
                placeholder='Введите новый пароль'
                onChange={onValueChange}
                value={data.password}
                extraClass={style.input}
                name='password'
            />
            <Input
                type='text'
                placeholder='Введите код из письма'
                onChange={onValueChange}
                value={data.token}
                error={error.token}
                errorText='Некоректный код'
                extraClass={style.input}
                name='token'
            />
            <Button htmlType='submit' type='primary' size='medium' extraClass={style.button}>Сохранить</Button>
            <p className={style.description}>Вспомнили пароль? <Link className={style.link} to='/login'>Войти</Link> </p>
        </form>
    )
}

export const ResetPassword = withForm(ResetPasswordPage, {password: '', token: ''});