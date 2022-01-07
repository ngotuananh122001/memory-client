import axios from 'axios';

// using origin
const url = 'http://192.168.1.70:5000/posts';

// get all posts in the database
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, post) => axios.patch(`${url}/${id}`, post);
