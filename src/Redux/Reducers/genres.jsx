// Used to store the movie genres
export default function genres(state = [], action) {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

