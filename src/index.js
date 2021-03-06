import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

//Importing reducers
import genres from './Redux/Reducers/genres';
import movieDetails from './Redux/Reducers/movieDetails';
import movies from './Redux/Reducers/movies';
import moviesSortedByGenres from './Redux/Reducers/moviesSortedByGenres';

//Importing Sagas
import fetchMovieDetails from './Redux/Sagas/fetchMovieDetails';
import fetchAllMovies from './Redux/Sagas/fetchAllMovies';
import sendMovieToAdd from './Redux/Sagas/sendMovieToAdd';
import updateMovieDetails from './Redux/Sagas/updateMovieDetails';
import addGenreToMovie from './Redux/Sagas/addGenreToMovie';
import deleteGenreFromMovie from './Redux/Sagas/deleteGenreFromMovie';
import fetchGenreList from './Redux/Sagas/fetchGenreList';
import fetchMoviesByGenres from './Redux/Sagas/fetchMoviesByGenres';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('SEND_MOVIE_TO_ADD', sendMovieToAdd);
    yield takeEvery('UPDATE_MOVIE_DETAILS', updateMovieDetails);
    yield takeEvery('ADD_GENRE_TO_MOVIE', addGenreToMovie);
    yield takeEvery('DELETE_GENRE_FROM_MOVIE', deleteGenreFromMovie);
    yield takeEvery('FETCH_GENRE_LIST', fetchGenreList);
    yield takeEvery('FETCH_MOVIES_BY_GENRE', fetchMoviesByGenres)
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
        moviesSortedByGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
