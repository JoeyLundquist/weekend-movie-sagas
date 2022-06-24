import { useHistory } from 'react-router-dom';


export default function MovieListItem({movie}) {
    const history = useHistory();

    return(
        <>
             <h3>{movie.title}</h3>
                            <img 
                                src={movie.poster} 
                                alt={movie.title}
                                onClick={() => {
                                    console.log('Movie DB Id', movie.id)
                                    history.push(`/movie-details/${movie.id}`)

                                }}
                            />
        </>
    )
}