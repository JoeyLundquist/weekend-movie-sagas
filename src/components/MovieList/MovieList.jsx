import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { Link } from 'react-router-dom';

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
            <Link to="/add-movie">Add Movie</Link>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <MovieListItem movie={movie}/>
                           
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

