//Importing tool, css, and components needed for this component
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MovieList.css'
import GenreList from '../GenreList/GenreList';
import MovieListItem from '../MovieListItem/MovieListItem';

//Component for Listing the movies on home page
export default function MovieList() {
    //Declaring dispatch and store
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    //Used for when page loads it can grab the movie list and genre list from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: 'FETCH_GENRE_LIST'})
    }, []);

    //Rendering component
    return (
        <main>
            <h1>MovieList</h1>
            <button className='addMovieButton'><Link className='addMovieButton' to="/add-movie">Add Movie</Link></button><br></br>
            <GenreList />
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

