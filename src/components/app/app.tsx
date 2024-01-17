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
import {getUserInfo, loadIngredients} from "../../utils/api-service";
import {useDispatch, useSelector} from "react-redux";
import {Ingredients} from "../../pages/ingredients/ingredients";
import {Modal} from "../dialog/modal/modal";
import {IngredientDetails} from "../body/ingredients/ingredient-details/ingredient-details";
import {PreLoader} from "../body/pre-loader/pre-loader";
import {NotFound404} from "../../pages/not-found-404/not-found-404";
import {UserInfo} from "../body/profile/user-info/user-info";
import {ErrorGeneral} from "../../pages/error-general/error-general";
import {getCookie} from "../../utils/cookie";
import {setIsAuth} from "../../services/auth";
import {TAuthStore, TBurgerIngredientsStore, TRootReducer} from "../../types/stores";

export const App: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {loading, error, success} = useSelector<TRootReducer, TBurgerIngredientsStore>(store => store.ingredients);
    const {isAuth, loading: isAuthLoading} = useSelector<TRootReducer, TAuthStore>((store) => store.auth);
    const [isInit, setIsInit] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        dispatch(loadIngredients());
        setIsInit(true);
        if (!isAuth && !isAuthLoading) {
            const refreshToken = getCookie('refreshToken');
            if (refreshToken) {
                dispatch(setIsAuth(true));
                // @ts-ignore
                dispatch(getUserInfo());
            }
        }
    }, [dispatch, setIsInit, isAuth, isAuthLoading]);

    if (loading || isAuthLoading || !isInit) {
        return (
            <div id="react-modals">
                <PreLoader/>
            </div>
        )
    }

    if (error || !success) {
        const message = error ?? "Что-то пошло не так..";
        return (
            <div id="react-modals">
                <ErrorGeneral message={message}/>
            </div>
        )
    }

    return (
        <div id="react-modals">
            <AppHeader/>
            <Routes location={location.state?.background || location}>
                <Route path='/' element={<Home/>}/>
                <Route path='/ingredients/:id' element={<Ingredients/>}/>

                <Route path='/profile/*' element={
                    <AuthRoute>
                        <Profile/>
                    </AuthRoute>
                }>
                    <Route path='user' element={<UserInfo/>}/>
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
                    <UnAuthDependentRoute pageName='/forgot-password' storeName='password'>
                        <ResetPassword/>
                    </UnAuthDependentRoute>
                }/>
                <Route path='*' element={
                    <NotFound404/>
                }/>
            </Routes>
            {
                location.state?.background && (
                    <Routes>
                        <Route path='/ingredients/:id' element={
                            <Modal title="Детали ингредиента" onClose={() => { navigate('/') }}>
                                <IngredientDetails/>
                            </Modal>
                        }
                        />
                    </Routes>
                )
            }
        </div>
    )
}
