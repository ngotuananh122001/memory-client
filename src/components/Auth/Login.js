import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import Validator from './validate/validator';

import './styles/auth.css';

const Login = () => {
    const [auth, setAuth] = useState({
        username: '',
        password: '',
    });
    const dispatch = useDispatch();

    const onChangeForm = (event) => {
        setAuth({
            ...auth,
            [event.target.id]: event.target.value,
        });
    };

    // login
    const onSubmitForm = (form) => {
        const username = form.querySelector('#username');
        const password = form.querySelector('#password');
        dispatch(login(username.value, password.value));
    };

    useEffect(() => {
        Validator(
            document.querySelector('form'),
            {
                username: document.querySelector('#username'),
                password: document.querySelector('#password'),
            },
            onSubmitForm
        );
    }, []);

    return (
        <div className="auth-container">
            <div className="auth-section">
                <form>
                    <h1>Login</h1>
                    <div className="form-control">
                        <label forname="username">usename:</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={auth.username}
                            onChange={onChangeForm}
                        />
                        <small></small>
                        <span></span>
                    </div>
                    <div className="form-control">
                        <label forname="password">password:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={auth.password}
                            onChange={onChangeForm}
                        />
                        <small></small>
                        <span></span>
                    </div>
                    <button type="submit" className="btn-auth">
                        Login
                    </button>
                    <div className="signup-link">
                        Chua co tai khoan ? <Link to="/register">Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
