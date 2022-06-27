export default function moviesSortedByGenres(state = [], action) {

    switch(action.type){
        case 'SET_MOVIES_BY_GENRES':
            return action.payload;
        default:
            return state;
    }
}