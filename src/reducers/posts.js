const reducer = (posts = [], action) => {
    switch (action.type) {
        case "FETCH_POSTS":
            return [...posts, action.payload];
        case "CREATE_POST":
            return [...posts, action.payload];
        default:
            return posts;
    }
};

export default reducer;
