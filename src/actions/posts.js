import * as api from '../api';

export const FETCH_ALL = 'FETCH_ALL';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST'

export const getPosts = () => async (dispatch) => {
    try {
        // axios thuc hien request va nhan res tra ve
        // parser tu json sang js type
        // dua vao luu trong truong data
        const { data } = await api.fetchPosts();
        const posts = data;

        dispatch({
            type: FETCH_ALL,
            payload: posts,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({
            type: CREATE_POST,
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({
            type: UPDATE_POST,
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};
