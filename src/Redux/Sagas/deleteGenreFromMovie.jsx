import axios from "axios"
import { put } from "redux-saga/effects"

function* deleteGenreFromMovie(action) {

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

export default deleteGenreFromMovie;