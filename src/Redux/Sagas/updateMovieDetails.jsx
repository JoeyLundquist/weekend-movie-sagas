//Importing axios communicate with server and put ot make a dispatch to sagas
import axios from "axios";
import { put } from "redux-saga/effects";

//Used to make http request to update the information from a movie in DB
export default function* updateMovieDetails(action) {
    try{
        const res = yield axios.put('/api/movie/' + action.payload.id, action.payload)
        yield put({
            type: 'FETCH_MOVIE_DETAILS',
            payload: action.payload.id
        })
    }   
    catch{
        console.error('failed to update movie details')
    }

}