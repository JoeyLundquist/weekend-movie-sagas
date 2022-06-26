import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import '../MovieForm/movieForm.css'

export default function MovieDetails() {
    const dispatch = useDispatch()
    const history = useHistory();

    //Declaring a variable for the edit mode to use conditional rendering
    let editingModeVariable = false;
    
    const movie = useSelector(store => store.movieDetails);
    const [editedMovieInfo, setEditedMovieInfo] = useState({})
    const [inEditMode, setInEditMode] = useState(false)

    let {id} = useParams();


    useEffect(() => {
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: Number(id)
        }),
        history.push(`/details/${id}`)
    }, [id]);

    const submitMovieDetailsChange = () => {
        dispatch({
            type: 'UPDATE_MOVIE_DETAILS',
            payload: editedMovieInfo
        })
        setInEditMode(false)
    }

    const editMode = () => {
            editingModeVariable = !editingModeVariable

        setInEditMode(editingModeVariable)
        setEditedMovieInfo({id: Number(id), title: movie[0].title, description: movie[0].description})
    }

    return (
        <>
            
            {
                !inEditMode &&   
                    <button onClick={editMode}>Edit</button>
                    
            }
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
                    <>
                        <textarea 
                            className="movieDescriptionTextArea"
                            type="text" 
                            value={editedMovieInfo.description}
                            onChange={(e) => setEditedMovieInfo({...editedMovieInfo, description: e.target.value})}
                        /><br></br>
                        <button onClick={submitMovieDetailsChange}>Submit</button>
                        <button onClick={() => setInEditMode(false)}>Cancel</button>
                    </>
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