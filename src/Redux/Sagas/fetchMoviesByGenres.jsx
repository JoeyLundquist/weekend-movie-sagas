import axios from "axios"
import { put } from "redux-saga/effects"

export default function* fetchMoviesByGenres(action) {
    try{
        const res = yield axios.get(`/api/genre/${action.payload}`)
        yield put({
            type:'SET_MOVIES_BY_GENRES',
            payload: res.data
        })
    }
    catch{

    }
}