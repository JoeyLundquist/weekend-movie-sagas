import { useState } from "react";
import { useDispatch } from "react-redux";


const MovieForm = () => {
    const dispatch = useDispatch();

    const [movieToAdd, setMovieToAdd] = useState({});

    const onSubmitMovie = (e) => {
        // e.preventDefault();
    }


    return (
        <>
            <section>
                <form onSubmit={onSubmitMovie}>
                    <input type="text" placeholder="Movie Title" /><br></br>
                    <input type="text" placeholder="Movie Poster URL" /><br></br>
                    <textarea placeholder="Movie Description"></textarea><br></br>
                    <select id="genres">
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