import {
    CREATE_POST,
    FETCH_ALL,
    UPDATE_POST,
    DELETE_ALL,
    DELETE_POST,
} from '../actions/posts';

const reducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return [...posts, ...action.payload];
        case CREATE_POST:
            return [...posts, action.payload];
        case UPDATE_POST:
            return posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
            );
        case DELETE_POST:
            return posts.filter((post) => post._id !== action.payload);
        case DELETE_ALL:
            return [];
        default:
            return posts;
    }
};

export default reducer;
