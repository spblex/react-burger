import style from './login.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FC, SyntheticEvent, useCallback} from "react";
import {withForm} from "../../hocs/with-form";
import {useDispatch} from "react-redux";
import {login} from "../../utils/api-service";
import {TWrappedComponentProps} from "../../types/props";
import {TResponse} from "../../types/api-types";

const LoginPage: FC<TWrappedComponentProps> = ({onValueChange, validate, data, error}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: '/'}};

    const onSubmit = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        if (validate()) {
            // @ts-ignore
            dispatch(login(data))
                .then((result: TResponse) => {
                    if (!result.error) {
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