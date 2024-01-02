import style from "./user-info.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {updateUserInfo} from "../../../../utils/api-service";
import {useDispatch, useSelector} from "react-redux";

const INIT_PASSWORD = '';

export default function UserInfo() {
    const dispatch = useDispatch();
    const {user} = useSelector(store => store.auth);
    const [data, setData] = useState({
        nickname: user.name,
        email: user.email,
        password: INIT_PASSWORD
    });

    const [error, setError] = useState({
        nickname: false,
        email: false,
        password: false
    });

    const [hasChanges, setHasChanges] = useState(false);

    const checkChanges = useCallback(() => {
        let isChanged = false;
        isChanged |= data.email !== user.email;
        isChanged |= data.nickname !== user.name;
        setHasChanges(isChanged);
    });

    const onValueChange = useCallback((e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });

        setError({
            ...error,
            [e.target.name]: e.target.value.length === 0
        });

        let isChanged = false;
        isChanged |= e.target.name === 'password';
        isChanged |= data.password !== INIT_PASSWORD;
        isChanged |= e.target.value !== user[e.target.name !== 'nickname' ? e.target.name : 'name'];
        isChanged |= data.email !== user.email;
        isChanged |= data.nickname !== user.name;
        setHasChanges(isChanged);
    }, [data, error, hasChanges]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (hasChanges) {
            const changes = {
                name: data.nickname,
                email: data.email
            };

            if (data.password !== INIT_PASSWORD) {
                changes.password = data.password;
            }
            dispatch(updateUserInfo(changes)).then(checkChanges);
        }
    },[data, dispatch, hasChanges]);

    const onCancel = useCallback((e) => {
        e.preventDefault();


    },[data]);

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
                error={error.password}
                errorText='Некоректный пароль'
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