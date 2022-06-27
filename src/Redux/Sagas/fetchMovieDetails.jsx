//Importing axios communicate with server and put ot make a dispatch to sagas
import { put } from "redux-saga/effects";
import axios from "axios";

//Used to make http request to get a single movies details from DB
export default function* fetchMovieDetails(action) {
    try{
        const movieDetails = yield axios.get(`/api/movie/${action.payload}`);
        console.log('get movie details', movieDetails.data);
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails.data});

    }
    catch {
        console.log('get details error');
    }
}

