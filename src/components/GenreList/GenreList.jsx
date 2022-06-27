import { useSelector } from "react-redux";
import './genreList.css'

//Component used to display the list of genres on top of the list of movies
export default function GenreList() {
    //Declaring redux to grab genre list
    const genres = useSelector(store => store.genres)

    //Render component to list all the genres on home page
    return (
        <>
            <div className="genreListContainer">
                {genres.map(g => (
                    <div className="genreListItems">
                    <h5>{g.name}</h5>
                    </div>
                ))}
            </div>
        </>
    )
}
