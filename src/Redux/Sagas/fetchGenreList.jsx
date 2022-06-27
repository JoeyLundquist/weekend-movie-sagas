//Importing axios communicate with server and put ot make a dispatch to sagas
import axios from "axios"
import { put } from "redux-saga/effects"

//Used to make http request to get the list of all genres from DB
export default function* fetchGenreList() {

    try{
        const res = yield axios.get('/api/genre')
        yield put({
            type: 'SET_GENRES',
            payload: res.data
        })
    }
    catch{
        console.log('failed to get genre list')
    }
}