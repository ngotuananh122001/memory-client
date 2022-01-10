const initialAuth = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
};

const reducer = (state = initialAuth, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user,
            };
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        case 'REGISTER':
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user,
            };
        default:
            return state;
    }
};

export default reducer;
