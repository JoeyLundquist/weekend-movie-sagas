import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import '../MovieForm/movieForm.css'
import './movieDetails.css'


export default function MovieDetails() {
    const dispatch = useDispatch()
    const history = useHistory();

    //Declaring a variable for the edit mode to use conditional rendering
    let editingModeVariable = false;
    
    const movie = useSelector(store => store.movieDetails);
    const [editedMovieInfo, setEditedMovieInfo] = useState({})
    const [inEditMode, setInEditMode] = useState(false)
    const [genreToAdd, setGenreToAdd] = useState(0)

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

    const addGenreToMovie = () => {
        dispatch({
            type: 'ADD_GENRE_TO_MOVIE',
            payload: {movie_id: id, genre_id: genreToAdd}
        })
    }

    return (
        <>
            <div className="movieDetailsCard">
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
                            className="movieDescriptionTextArea editDescriptionArea"
                            type="text" 
                            value={editedMovieInfo.description}
                            onChange={(e) => setEditedMovieInfo({...editedMovieInfo, description: e.target.value})}
                        />
                        <div className="genreAdder">
                        <label>Genre</label><br></br>
                            <select id="genres" value={genreToAdd.genre_id} onChange={(e) => setGenreToAdd(e.target.value)}>
                                <option value="0">...</option>
                                <option value="1">Adventure</option>
                                <option value="2">Animated</option>
                                <option value="3">Biographical</option>
                                <option value="4">Comedy</option>
                                <option value="5">Disaster</option>
                                <option value="6">Drama</option>
                                <option value="7">Epic</option>
                                <option value="8">Fantasy</option>
                                <option value="9">Musical</option>
                                <option value="10">Romantic</option>
                                <option value="11">Science Fiction</option>
                                <option value="12">Space-Opera</option>
                                <option value="13">Superhero</option>
                            </select><br></br>
                            <button onClick={addGenreToMovie}>Add Genre</button>
                        </div>
                        <br></br>
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
            {
                !inEditMode &&   
                    <button className="editButton" onClick={editMode}>Edit</button>

            }
            </div>


            <Link to="/">Back To Home Page</Link>
        </>
    )
}