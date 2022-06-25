import { put } from "redux-saga/effects";
import axios from "axios";

function* fetchMovieDetails(action) {
    //Get a single movies details
    try{
        const movieDetails = yield axios.get(`/api/movie/${action.payload}`);
        console.log('get movie details', movieDetails.data);
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails.data});

    }
    catch {
        console.log('get details error');
    }
}

export default fetchMovieDetails;