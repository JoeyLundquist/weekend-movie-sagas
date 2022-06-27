//Importing axios communicate with server and put ot make a dispatch to sagas
import axios from "axios";
import { put } from "redux-saga/effects";

//Used to make http request to add new genre to movie in DB
export default function* addGenreToMovie(action) {
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

