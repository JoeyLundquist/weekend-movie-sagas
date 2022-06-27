// Used to store movie details
export default function movieDetails(state = {}, action) {
    switch(action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
