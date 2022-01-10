import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkAuthenticated } from './api';
import Auth from './Pages/auth/Auth';
import Home from './Pages/home/Home';
import LadingPage from './Pages/LadingPage';
import setAuthToken from './utils/configAxiosHeader';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadUser = async () => {
            // Get token from localStorage if having
            const token = localStorage['TOKEN_NAME'];
            if (token) {
                setAuthToken(token);
            }

            // Request len server check token
            // Neu token linh tinh -> xoa luon
            try {
                const { data } = await checkAuthenticated();
                if (data.success) {
                    dispatch({
                        type: 'SET_AUTH',
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
                localStorage.removeItem('TOKEN_NAME');
                setAuthToken(null);
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };

        loadUser();
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LadingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<div>Not found</div>} />
                <Route path="/login" element={<Auth authType={'login'} />} />
                <Route
                    path="/register"
                    element={<Auth authType={'register'} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
