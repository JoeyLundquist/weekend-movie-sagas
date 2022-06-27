//Importing history to bring us to details page
import { useHistory } from 'react-router-dom';

//Component to display the items in the list on homepage
export default function MovieListItem({movie}) {
    //Declaring history to use it to direct us to details page
    const history = useHistory();

    //Rendering movie cards on home page
    return(
        <>
             <h3>{movie.title}</h3>
             <div className="poster-container">
            <img 
                src={movie.poster} 
                alt={movie.title}
                onClick={() => {
                    console.log('Movie DB Id', movie.id)
                    history.push(`/details/${movie.id}`)

                }}
            />
            </div>
        </>
    )
}