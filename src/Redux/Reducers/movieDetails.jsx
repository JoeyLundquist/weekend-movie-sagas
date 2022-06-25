// Used to store movie details
const movieDetails = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default movieDetails;