import axios from "axios";
import { put } from "redux-saga/effects";

function* updateMovieDetails(action) {
    try{
        const res = yield axios.put('/api/movie/' + action.payload.id, action.payload)
        yield put({
            type: 'FETCH_MOVIE_DETAILS'
        })
    }   
    catch{
        console.error('failed to update movie details')
    }

}

export default updateMovieDetails;