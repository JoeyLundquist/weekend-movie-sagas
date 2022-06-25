import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";

export default function MovieDetails() {
    const dispatch = useDispatch()
    const history = useHistory();

    const movie = useSelector(store => store.movieDetails);

    console.log(movie)
    let {id} = useParams();
    console.log('id is', Number(id))
    useEffect(() => {
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: Number(id)
        }),
        history.push(`/movie-details/${id}`)
    }, [id])

    return (
        <>
            <h3>{movie[0] && movie[0].title}</h3>
            <h4>{movie[0] && movie[0].description}</h4>
            {movie[0] && movie[0].genres.map((g, i) => (
                <>
                    <h5 key={i}>{g}</h5>
                </>
            ))}
            <img src={movie[0] && movie[0].poster}/><br></br>
            <Link to="/">Back To Home Page</Link>
        </>
    )
}