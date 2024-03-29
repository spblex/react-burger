import style from './login.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FC, FormEvent, useCallback} from "react";
import {withForm} from "../../hocs/with-form";
import {login} from "../../utils/api-service";
import {TWrappedComponentProps} from "../../types/props";
import {useAppDispatch} from "../../hooks/useAppDispatch";

const LoginPage: FC<TWrappedComponentProps> = ({onValueChange, validate, data, error}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: '/'}};

    const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            dispatch(login({
                email: data.email,
                password: data.password
            })).then((result) => {
                if (result.payload !== undefined) {
                    navigate(from, {replace: true});
                }
            });
        }
    },[validate, data, dispatch, from, navigate])

    return (

        <form className={style.form} onSubmit={onSubmit}>
            <h2 className={style.title}>Вход</h2>
            <Input
                type='email'
                placeholder='E-mail'
                onChange={onValueChange}
                value={data.email}
                error={error.email}
                errorText='Некорректный email'
                extraClass={style.input}
                name='email'
            />
            <PasswordInput
                placeholder='Пароль'
                onChange={onValueChange}
                value={data.password}
                extraClass={style.input}
                name='password'
            />
            <Button htmlType='submit' type='primary' size='medium' extraClass={style.button}>Войти</Button>
            <p className={style.description}>Вы - новый пользователь? <Link className={style.link} to='/register'>Зарегистрироваться</Link> </p>
            <p className={style.description}>Забыли пароль? <Link className={style.link} to='/forgot-password'>Востановить пароль</Link> </p>
        </form>
    )
}

export const Login = withForm(LoginPage, {email: '', password: ''});