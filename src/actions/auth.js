import { loginSys, registerSys } from '../api';
import setAuthToken from '../utils/configAxiosHeader';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export const login = (username, password) => async (dispatch) => {
    try {
        const { data } = await loginSys({ username, password });
        if (data.success) {
            console.log(data.message);

            // save accessToken
            localStorage.setItem('TOKEN_NAME', data.accessToken);
            setAuthToken(localStorage['TOKEN_NAME']);
            dispatch({
                type: 'LOGIN',
                payload: {
                    isAuthenticated: true,
                    user: data.user,
                },
            });
        }
    } catch (error) {
        // Loi tu server gui den
        // Server noi rang thong tin gui len khong hop le
        if (error.response) {
            console.log(error.response.data);
        } else {
            // serve or duong truyen mang co van de
            console.log(error);
        }
    }
};

export const register =
    ({ username, email, password }) =>
    async (dispatch) => {
        try {
            const { data } = await registerSys({ username, email, password });

            if (data.success) {
                console.log(data.message);

                // save accessToken
                localStorage.setItem('TOKEN_NAME', data.accessToken);
                setAuthToken(localStorage['TOKEN_NAME']);
                dispatch({
                    type: 'REGISTER',
                    payload: {
                        isAuthenticated: true,
                        user: data.user,
                    },
                });
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log(error);
            }
        }
    };
