//Importing needed tools and css
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import '../MovieForm/movieForm.css'
import './movieDetails.css'

//Component for showing movie details
export default function MovieDetails() {
    const dispatch = useDispatch()
    const history = useHistory();

    //Declaring a variable for the edit mode to use conditional rendering
    let editingModeVariable = false;
    let {id} = useParams();
    
    //Declaring store variables and local state for editing movies
    const movie = useSelector(store => store.movieDetails);
    const [editedMovieInfo, setEditedMovieInfo] = useState({})
    const [inEditMode, setInEditMode] = useState(false)
    const [genreToAdd, setGenreToAdd] = useState(0)
    const [genreToDelete, setGenreToDelete] = useState({movieId: id, genreId: 0, genreName: ''})


    //For on page load so you can refresh page or type in url
    useEffect(() => {
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: Number(id)
        }),
        history.push(`/details/${id}`)
    }, [id]);

    //Used to call update movie saga to 
    const submitMovieDetailsChange = () => {
        dispatch({
            type: 'UPDATE_MOVIE_DETAILS',
            payload: editedMovieInfo
        })
        setInEditMode(false)
    }

    //Used to switch back and forth from edit and view mode
    const editMode = () => {
            editingModeVariable = !editingModeVariable

        setInEditMode(editingModeVariable)
        setEditedMovieInfo({id: Number(id), title: movie.title, description: movie.description})
    }

    //Used to make saga call for adding new genres to movies
    const addGenreToMovie = () => {
        dispatch({
            type: 'ADD_GENRE_TO_MOVIE',
            payload: {movie_id: id, genre_id: genreToAdd}
        })
        setInEditMode(false)
    }

    //Used to delete genres from movies
    const deleteGenreFromMovie = () => {
        dispatch({
            type:'DELETE_GENRE_FROM_MOVIE',
            payload: genreToDelete
        })
    }
    console.log(genreToDelete)

    //Rendering component
    return (
        <>
            <div className="movieDetailsCard">
                {/* Conditional render for edit mode */}
            {
                !inEditMode ?
                    <h3>{movie && movie.title}</h3> 
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
                {/* Conditional render for edit mode */}
            {
                !inEditMode ? 
                    <h4>{movie && movie.description}</h4> 
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
                            <button onClick={addGenreToMovie}>Add Genre</button><br></br>
                            <p>{genreToDelete.genreName}</p><br></br>
                            <button onClick={deleteGenreFromMovie}>Delete Genre</button>
                        </div>
                        <br></br>
                        <button onClick={submitMovieDetailsChange}>Submit</button>
                        <button onClick={() => setInEditMode(false)}>Cancel</button>
                        
                    </>
            }
                {/* Conditional render for edit mode */}
            {
                !inEditMode?
                movie.genre && movie.genre.map((g) => (
                    <>
                        <h5 key={g.id}>{g.name}</h5>
                    </>
                )) 
                :
                movie && movie.genre.map((g) => (
                    <>
                        <div>
                            <h5 className="genreDeleteBtn" key={g.id}>{g.name}</h5>
                            <button onClick={() => {
                                setGenreToDelete({...genreToDelete, genreId:  g.id, genreName: g.name})
                            }} 
                            className="genreDeleteBtn">❌</button>
                        </div>
                    </>
                )) 
            }
            
            <img className="details-poster" src={movie && movie.poster}/><br></br>
                {/* Conditional render for edit mode */}
            {
                !inEditMode &&   
                    <button className="editButton" onClick={editMode}>Edit</button>

            }
            </div>


            <Link to="/">Back To Home Page</Link>
        </>
    )
}