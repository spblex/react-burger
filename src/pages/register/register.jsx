import style from './register.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {withForm} from "../../hocs/with-form";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {register} from "../../utils/api-service";
import PropTypes from "prop-types";

const RegisterPage = ({onValueChange, validate, data, error}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(register({
                name: data.nickname,
                email: data.email,
                password: data.password
            }))
                .then((result) => {
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
                error={error.password}
                errorText='Некоректный пароль'
                extraClass={style.input}
                name='password'
            />
            <Button htmlType='submit' type='primary' size='medium' extraClass={style.button}>Зарегистрироваться</Button>
            <p className={style.description}>Уже зарегистрированы? <Link className={style.link} to='/login'>Войти</Link> </p>
        </form>
    );
}

export const Register = withForm(RegisterPage, {nickname: '', email: '', password: ''});

RegisterPage.propTypes = {
    onValueChange: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}