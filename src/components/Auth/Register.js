import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import './styles/auth.css';
import Validator from './validate/validator';

const Register = () => {
    const dispatch = useDispatch();
    const [auth, setAuth] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const onChangeForm = (event) => {
        setAuth({
            ...auth,
            [event.target.id]: event.target.value,
        });
    };

    const onSubmitForm = (form) => {
        const username = form.querySelector('#username');
        const password = form.querySelector('#password');
        const email = form.querySelector('#email');
        dispatch(
            register({
                username: username.value,
                password: password.value,
                email: email.value,
            })
        );
    };
    useEffect(() => {
        Validator(
            document.querySelector('form'),
            {
                username: document.querySelector('#username'),
                email: document.querySelector('#email'),
                password: document.querySelector('#password'),
                confirmPassword: document.querySelector('#confirmPassword'),
            },
            onSubmitForm
        );
    }, []);

    return (
        <div className="auth-container">
            <div className="auth-section">
                <form>
                    <h1>Register</h1>
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
                        <label forname="email">email:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={auth.email}
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
                    <div className="form-control">
                        <label forname="confirm-password">confirm:</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={auth.confirmPassword}
                            onChange={onChangeForm}
                        />
                        <small></small>
                        <span></span>
                    </div>
                    <button type="submit" className="btn-auth">
                        Register
                    </button>
                    <div className="signup-link">
                        Co tai khoan ? <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
