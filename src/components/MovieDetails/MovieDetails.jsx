import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";


export default function MovieDetails() {
    const movies = useSelector(store => store.movies);

    console.log(movies)
    let {id} = useParams();
    console.log('id is', id)


    return (
        <>
            <h3>{movies[id-1].title}</h3>
            <h4>{movies[id-1].description}</h4>
            <img src={movies[id-1].poster}/>
        </>
    )
}