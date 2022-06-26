import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


import MovieListItem from '../MovieListItem/MovieListItem';

export default function MovieList() {



    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <button className='addMovieButton'><Link className='addMovieButton' to="/add-movie">Add Movie</Link></button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div className='movieCard' key={movie.id} >
                            <MovieListItem movie={movie}/>
                           
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

