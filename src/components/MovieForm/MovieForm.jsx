import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


const MovieForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [movieToAdd, setMovieToAdd] = useState({title: '', poster: '', description: '', genre_id: 0});

    const onSubmitMovie = (e) => {
        e.preventDefault();
        console.log(movieToAdd)
        if(!movieToAdd.title || !movieToAdd.poster || !movieToAdd.description || !movieToAdd.genre_id){
            alert('Please fill out the forms')
            return;
        }
        dispatch({
            type: 'SEND_MOVIE_TO_ADD',
            payload: movieToAdd
        })
        history.push('/')
    }

    return (
        <>
            <section>
                <form onSubmit={onSubmitMovie}>
                    <input 
                        type="text" 
                        required
                        placeholder="Movie Title" 
                        value={movieToAdd.title} 
                        onChange={(e) => setMovieToAdd({...movieToAdd, title: e.target.value})}
                    /><br></br>

                    <input 
                        type="text" 
                        required
                        placeholder="Movie Poster URL" 
                        value={movieToAdd.poster} 
                        onChange={(e) => setMovieToAdd({...movieToAdd, poster: e.target.value})}
                    /><br></br>

                    <textarea 
                        placeholder="Movie Description" 
                        required
                        value={movieToAdd.description} 
                        onChange={(e) => setMovieToAdd({...movieToAdd, description: e.target.value})}>
                    </textarea><br></br>

                    <label>Genre</label><br></br>
                    <select id="genres" value={movieToAdd.genre} onChange={(e) => setMovieToAdd({...movieToAdd, genre_id: e.target.value})}>
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
                    <input type="submit" value="Submit Movie"/>
                </form>
            </section>
        </>
    )
}

export default MovieForm;