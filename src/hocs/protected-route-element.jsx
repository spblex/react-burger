import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../utils/cookie";
import {setAuthData} from "../services/auth";
import PropTypes from "prop-types";

function ProtectedRouteElement({onlyUnAuth = false, children}) {
    const {isAuth, loading} = useSelector((store) => store.auth);
    const location = useLocation();
    const dispatch = useDispatch();

    if (loading) {
        return null;
    }

    if (!isAuth) {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        if (accessToken && refreshToken) {
            dispatch(setAuthData({
                accessToken: accessToken,
                refreshToken: refreshToken
            }));
        }
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

export const UnAuthRoute = ({children}) => (
    <ProtectedRouteElement onlyUnAuth={true}>
        {children}
    </ProtectedRouteElement>
);

export const UnAuthDependentRoute = ({storeName, pageName, children}) => {
    const {loading, success} = useSelector((store) => store[storeName])

    return !loading && success ? (
        <ProtectedRouteElement onlyUnAuth={true}>
            {children}
        </ProtectedRouteElement>
    ) : (
        <Navigate to={pageName}/>
    );
}

ProtectedRouteElement.propTypes = {
    onlyUnAuth: PropTypes.bool,
    children: PropTypes.element.isRequired
}

UnAuthRoute.propTypes = {
    children: PropTypes.element.isRequired
}

UnAuthDependentRoute.propTypes = {
    storeName: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
}