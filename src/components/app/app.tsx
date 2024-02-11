import React, {FC, useEffect, useState} from 'react';
import {AppHeader} from "../app-header/app-header";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {Home} from "../../pages/home/home";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Register} from "../../pages/register/register";
import {Login} from "../../pages/login/login";
import {Profile} from "../../pages/profile/profile";
import {AuthRoute, UnAuthDependentRoute, UnAuthRoute} from "../../hocs/protected-route-element";
import {getUserInfo, loadIngredients, updateToken} from "../../utils/api-service";
import {Ingredients} from "../../pages/ingredients/ingredients";
import {Modal} from "../dialog/modal/modal";
import {IngredientDetails} from "../body/ingredients/ingredient-details/ingredient-details";
import {PreLoader} from "../body/pre-loader/pre-loader";
import {NotFound404} from "../../pages/not-found-404/not-found-404";
import {UserInfo} from "../body/profile/user-info/user-info";
import {ErrorGeneral} from "../../pages/error-general/error-general";
import {getCookie} from "../../utils/cookie";
import {setIsAuth} from "../../services/auth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {Feed} from "../../pages/feed/feed";
import {OrderList} from "../body/order/order-list/order-list";
import {OrderHistory} from "../body/order/order-history/order-history";
import style from "./app.module.css";

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {loading, error, success} = useAppSelector(store => store.ingredients);
    const {isAuth, loading: isAuthLoading} = useAppSelector((store) => store.auth);
    const [isInit, setIsInit] = useState<boolean>(false);

    useEffect(() => {
        dispatch(loadIngredients());
        if (!isAuth && !isAuthLoading) {
            const accessToken = getCookie('accessToken');
            const refreshToken = getCookie('refreshToken');

            if (accessToken) {
                dispatch(setIsAuth(true));
                dispatch(getUserInfo());
            } else if (refreshToken) {
                updateToken()
                    .then(() => {
                        dispatch(setIsAuth(true));
                        dispatch(getUserInfo());
                        setIsInit(true);
                    })
                    .catch(() => {
                        dispatch(setIsAuth(false));
                        setIsInit(true);
                    });
            } else {
                setIsInit(true);
            }
        } else {
            setIsInit(true);
        }
    }, [dispatch, setIsInit, isAuth, isAuthLoading]);

    if (loading || isAuthLoading || !isInit) {
        return (
            <PreLoader/>
        )
    }

    if (error || !success) {
        const message = error ?? "Что-то пошло не так..";
        return (
            <ErrorGeneral message={message}/>
        )
    }

    return (
        <>
            <AppHeader/>
            <div className={style.view}>
                <Routes location={location.state?.background || location}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/ingredients/:id' element={<Ingredients/>}/>
                    <Route path='/feed' element={<Feed/>}/>
                    <Route path='/feed/:id' element={<OrderHistory personal={false}/>}/>
                    <Route path='/profile/orders/:id' element={
                        <AuthRoute>
                            <OrderHistory personal={true}/>
                        </AuthRoute>
                    }/>

                    <Route path='/profile/*' element={
                        <AuthRoute>
                            <Profile/>
                        </AuthRoute>
                    }>
                        <Route path='user' element={<UserInfo/>}/>
                        <Route path='orders' element={<OrderList personal={true}/>}/>
                    </Route>

                    <Route path='/login' element={
                        <UnAuthRoute>
                            <Login/>
                        </UnAuthRoute>
                    }/>
                    <Route path='/register' element={
                        <UnAuthRoute>
                            <Register/>
                        </UnAuthRoute>
                    }/>
                    <Route path='/forgot-password' element={
                        <UnAuthRoute>
                            <ForgotPassword/>
                        </UnAuthRoute>
                    }/>
                    <Route path='/reset-password' element={
                        <UnAuthDependentRoute pageName='/forgot-password'>
                            <ResetPassword/>
                        </UnAuthDependentRoute>
                    }/>
                    <Route path='*' element={
                        <NotFound404/>
                    }/>
                </Routes>
            </div>
            {
                location.state?.background && (
                    <Routes>
                        <Route path='/ingredients/:id' element={
                            <Modal onClose={() => { navigate('/') }}>
                                <IngredientDetails/>
                            </Modal>
                        }/>
                        <Route path='/feed/:id' element={
                            <Modal onClose={() => { navigate('/feed') }}>
                                <OrderHistory personal={false}/>
                            </Modal>
                        }/>
                        <Route path='/profile/orders/:id' element={
                            <AuthRoute>
                                <Modal onClose={() => { navigate('/profile/orders') }}>
                                    <OrderHistory personal={true}/>
                                </Modal>
                            </AuthRoute>
                        }/>
                    </Routes>
                )
            }
        </>
    )
}
