import axios from "axios";
import { put } from "redux-saga/effects";

function* addGenreToMovie(action) {
    try{
        const res = yield axios.post('/api/genre', action.payload);
        yield put({
            type: 'FETCH_MOVIE_DETAILS',
            payload: action.payload.movie_id
        })
    }
    catch{
        console.error('Failed to add genre to movies')
    }
}

export default addGenreToMovie;