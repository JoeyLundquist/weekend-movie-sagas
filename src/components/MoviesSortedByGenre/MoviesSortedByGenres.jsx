import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import GenreList from "../GenreList/GenreList"
import MovieListItem from "../MovieListItem/MovieListItem"
import { Link } from "react-router-dom"


export default function MoviesSortedByGenres() {
    const movies = useSelector(store => store.moviesSortedByGenres)
    const dispatch = useDispatch()
    const params = useParams();

    useEffect(() => {
        dispatch({
            type: 'FETCH_MOVIES_BY_GENRE',
            payload: params.genre
        })
        dispatch({type: 'FETCH_GENRE_LIST'})
    }, [params.genre])

    return(
        <>
            <h2>{params.genre}</h2>
            <GenreList />
            <section className="movies">
                {movies && movies.map(movie => {
                    return (
                        <div className='movieCard' key={movie.id} >
                            <MovieListItem movie={movie}/>
                        </div>
                    );
                })}
            </section>
            <Link to="/">Back To Home Page</Link>
        </>
    )
}