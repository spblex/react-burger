import {Navigate, useLocation} from "react-router-dom";
import {TProtectedRouteBaseProps, TProtectedRouteDependentProps, TProtectedRouteElementProps} from "../types/props";
import {useAppSelector} from "../hooks/useAppSelector";

const ProtectedRouteElement: TProtectedRouteElementProps = ({onlyUnAuth = false, children}) => {
    const {isAuth, loading} = useAppSelector((store) => store.auth);
    const location = useLocation();

    if (loading) {
        return null;
    }

    if (isAuth && onlyUnAuth) {
        const {from} = location.state || {from: {pathname: '/'}};
        return <Navigate to={from} />
    }

    if (!isAuth && !onlyUnAuth) {
        return <Navigate to='/login' state={{from: location}}/>
    }

    return children;
}

export const AuthRoute = ProtectedRouteElement;

export const UnAuthRoute: TProtectedRouteBaseProps = ({children}) => (
    <ProtectedRouteElement onlyUnAuth={true}>
        {children}
    </ProtectedRouteElement>
);

export const UnAuthDependentRoute: TProtectedRouteDependentProps = ({pageName, children}) => {
    const {loading, success} = useAppSelector(store => store.password)

    return !loading && success ? (
        <ProtectedRouteElement onlyUnAuth={true}>
            {children}
        </ProtectedRouteElement>
    ) : (
        <Navigate to={pageName}/>
    );
}