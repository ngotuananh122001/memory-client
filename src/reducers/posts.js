import { CREATE_POST, FETCH_ALL } from '../actions/posts';

const reducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return [...posts, ...action.payload];
        case CREATE_POST:
            return [...posts, action.payload];
        default:
            return posts;
    }
};

export default reducer;
