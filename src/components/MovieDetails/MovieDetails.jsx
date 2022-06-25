import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails() {
    const dispatch = useDispatch()
    const history = useHistory();

    //Declaring a variable for the edit mode to use conditional rendering
    let inEditMode = true;
    
    const movie = useSelector(store => store.movieDetails);
    const [editedMovieInfo, setEditedMovieInfo] = useState({title: movie[0].title, description: movie[0].description})

    let {id} = useParams();

    useEffect(() => {
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: Number(id)
        }),
        history.push(`/movie-details/${id}`)
    }, [id]);

    const submitMovieDetailsChange = () => {
        dispatch({
            type: 'UPDATE_MOVIE_DETAILS',
            payload: editedMovieInfo
        })
    }

    return (
        <>
            <button onClick={submitMovieDetailsChange}>✅✅✅✅</button>
            {
                !inEditMode ?
                    <h3>{movie[0] && movie[0].title}</h3> 
                    : 
                    <>
                        <input 
                            type="text"    
                            value={editedMovieInfo.title} 
                            onChange={(e) => setEditedMovieInfo({...editedMovieInfo, title: e.target.value})}
                        />
                        <br></br> 
                    </>
            }

            {
                !inEditMode ? 
                    <h4>{movie[0] && movie[0].description}</h4> 
                    : 
                    <textarea 
                        type="text" 
                        value={editedMovieInfo.description}
                        onChange={(e) => setEditedMovieInfo({...editedMovieInfo, description: e.target.value})}
                    />
            }
            
            {movie[0] && movie[0].genres.map((g, i) => (
                <>
                    <h5 key={i}>{g}</h5>
                </>
            ))}
            <img className="details-poster" src={movie[0] && movie[0].poster}/><br></br>

            <Link to="/">Back To Home Page</Link>
        </>
    )
}