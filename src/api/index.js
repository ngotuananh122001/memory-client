import axios from "axios";

// using origin
const url = "http://localhost:5000/posts";

// get all posts in the database
export const fetchPosts = () => axios.get(url);