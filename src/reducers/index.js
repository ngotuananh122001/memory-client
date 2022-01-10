import { combineReducers } from 'redux';
import postsReducer from './posts';
import authReducer from './auth';

const reducers = combineReducers({
    auth: authReducer,
    posts: postsReducer,
});

export default reducers;
