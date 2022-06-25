import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';

// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

import movies from "./Reducers/movies";
import genres from "./Reducers/genres";
import movieDetails from "./Reducers/movieDetails";

import fetchAllMovies from "./Sagas/fetchAllMovies";
import fetchMovieDetails from "./Sagas/fetchMovieDetails";

const storeInstance = () => {
// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails)
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);
}
export default storeInstance;