//Importing axios communicate with server and put ot make a dispatch to sagas
import { put } from "redux-saga/effects";
import axios from "axios";

//Used to make http request to add a new movie to DB
export default function* sendMovieToAdd(action) {
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