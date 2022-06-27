//Importing axios communicate with server and put ot make a dispatch to sagas
import axios from "axios"
import { put } from "redux-saga/effects"

//Used to make http request to delete genre from movie in DB
export default function* deleteGenreFromMovie(action) {
    try{
        const res = yield axios.delete('/api/genre', {data: action.payload});
        console.log('this is the payload', action.payload)
        yield put({
            type: 'FETCH_MOVIE_DETAILS',
            payload: action.payload.movieId
        })
    }
    catch{
        console.log('failed to delete')
    }
}
