//Importing history to bring us to details page
import { useHistory, Link } from 'react-router-dom';

//Component to display the items in the list on homepage
export default function MovieListItem({movie}) {
    //Declaring history to use it to direct us to details page
    const history = useHistory();

    //Rendering movie cards on home page
    return(
        
            <div key={movie.id}>
                <h3>{movie.title}</h3>
                <div className="poster-container">
                <Link to={`/details/${movie.id}`}>
                    <img 
                        src={movie.poster} 
                        alt={movie.title}
                    />
                </Link>
                </div>
            </div>
        
    )
}