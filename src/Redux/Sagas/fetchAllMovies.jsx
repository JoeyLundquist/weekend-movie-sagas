//Importing axios communicate with server and put ot make a dispatch to sagas
import { put } from "redux-saga/effects";
import axios from "axios";

//Used to make http request to get list of all movies from DB
export default function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }      
}

