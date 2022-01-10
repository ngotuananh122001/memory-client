import axios from 'axios';

// using origin
// const url = 'http://192.168.1.70:5000';
const url =
    process.env.NODE_ENV !== 'production'
        ? 'http://192.168.1.70:5000'
        : 'https://thawing-cliffs-92158.herokuapp.com';

// auth
export const checkAuthenticated = () => axios.get(`${url}/auth`);
export const loginSys = (data) => axios.post(`${url}/auth/login`, data);
export const registerSys = (data) => axios.post(`${url}/auth/register`, data);
// get all posts in the database
export const fetchPosts = () => axios.get(`${url}/posts`);
export const createPost = (newPost) => axios.post(`${url}/posts`, newPost);
export const updatePost = (id, post) => axios.patch(`${url}/posts/${id}`, post);
export const deletePost = (id) => axios.delete(`${url}/posts/${id}`);
