import style from './forgot-password.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {withForm} from "../../hocs/with-form";
import {useCallback} from "react";
import {passwordReset} from "../../utils/api-service";
import {useDispatch} from "react-redux";

const ForgotPasswordPage = ({onValueChange, validate, data, error}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(passwordReset(data))
                .then((result) => {
                    if (!result.error) {
                        navigate('/reset-password', {replace: false});
                    }
                });
        }
    },[validate, dispatch, navigate, data])

    return (

        <form className={style.form} onSubmit={onSubmit}>
            <h2 className={style.title}>Востановление пароля</h2>
            <Input
                type='email'
                placeholder='Укажите e-mail'
                onChange={onValueChange}
                value={data.email}
                error={error.email}
                errorText='Некоректный email'
                extraClass={style.input}
                name='email'
            />
            <Button htmlType='submit' type='primary' size='medium' extraClass={style.button}>Востановить</Button>
            <p className={style.description}>Вспомнили пароль? <Link className={style.link} to='/login'>Войти</Link> </p>
        </form>
    )
}

export const ForgotPassword = withForm(ForgotPasswordPage, {email: ''});