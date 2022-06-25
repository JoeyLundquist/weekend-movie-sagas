import { put } from "redux-saga/effects";
import axios from "axios";

function* sendMovieToAdd(action) {

    try{
        const res = yield axios.post('/api/movie', action.payload);
        yield put({
            type: 'FETCH_MOVIES'
        })
    }
    catch{
        console.log('failed to POST new movie')
    }
}

export default sendMovieToAdd;