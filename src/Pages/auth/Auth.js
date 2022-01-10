import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';

const Auth = ({ authType }) => {
    const naviage = useNavigate();
    const { authLoading, isAuthenticated } = useSelector((state) => state.auth);

    let body;
    if (authLoading) {
        body = <div></div>;
    } else if (isAuthenticated) {
        naviage('/home');
    } else {
        body = (
            <>
                {authType === 'login' && <Login />}
                {authType === 'register' && <Register />}
            </>
        );
    }
    return <>{body}</>;
};

export default Auth;
