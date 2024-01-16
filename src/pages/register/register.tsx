import style from './register.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {withForm} from "../../hocs/with-form";
import {FC, SyntheticEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {register} from "../../utils/api-service";
import {TWrappedComponentProps} from "../../types/props";
import {TResponse} from "../../types/api-types";

const RegisterPage: FC<TWrappedComponentProps> = ({onValueChange, validate, data, error}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        if (validate()) {
            // @ts-ignore
            dispatch(register({
                name: data.nickname,
                email: data.email,
                password: data.password
            }))
                .then((result: TResponse) => {
                    if (!result.error) {
                        navigate('/', {replace: true});
                    }
                });
        }
    },[validate, data, dispatch, navigate]);

    return (
        <form className={style.form} onSubmit={onSubmit}>
            <h2 className={style.title}>Регистрация</h2>
            <Input
                type='text'
                placeholder='Имя'
                onChange={onValueChange}
                value={data.nickname}
                error={error.nickname}
                errorText='Некоректное имя'
                extraClass={style.input}
                name='nickname'
            />
            <Input
                type='email'
                placeholder='E-mail'
                onChange={onValueChange}
                value={data.email}
                error={error.email}
                errorText='Некоректный email'
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
            <Button htmlType='submit' type='primary' size='medium' extraClass={style.button}>Зарегистрироваться</Button>
            <p className={style.description}>Уже зарегистрированы? <Link className={style.link} to='/login'>Войти</Link> </p>
        </form>
    );
}

export const Register = withForm(RegisterPage, {nickname: '', email: '', password: ''});