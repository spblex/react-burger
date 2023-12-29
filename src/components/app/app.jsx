import React from 'react';
import AppHeader from "../app-header/app-header";
import {Route, Routes} from 'react-router-dom';
import Home from "../../pages/home/home";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Register} from "../../pages/register/register";
import {Login} from "../../pages/login/login";
import Profile from "../../pages/profile/profile";
import {AuthRoute, UnAuthDependentRoute, UnAuthRoute} from "../../hocs/protected-route-element";

export default function App() {
    return (
        <div id="react-modals">
            <AppHeader/>
            <Routes>
                <Route path='/' element={<Home/>}/>

                <Route path='profile/*' element={
                    <AuthRoute>
                        <Profile/>
                    </AuthRoute>
                }/>

                <Route path='login' element={
                    <UnAuthRoute>
                        <Login/>
                    </UnAuthRoute>
                }/>
                <Route path='register' element={
                    <UnAuthRoute>
                        <Register/>
                    </UnAuthRoute>
                }/>
                <Route path='forgot-password' element={
                    <UnAuthRoute>
                        <ForgotPassword/>
                    </UnAuthRoute>
                }/>
                <Route path='reset-password' element={
                    <UnAuthDependentRoute pageName='/forgot-password' storeName='password'>
                        <ResetPassword/>
                    </UnAuthDependentRoute>
                }/>
            </Routes>
        </div>
    )
}
