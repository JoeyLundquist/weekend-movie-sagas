import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";


export default function MovieDetails() {
    const movies = useSelector(store => store.movies);

    console.log(movies)
    let {id} = useParams();
    console.log('id is', Number(id))

    for(let i = 0; i<movies.length; i++){
        if(movies[i].id === Number(id)){
            id = i
            break
        }
    }

    return (
        <>
            <h3>{movies[id].title}</h3>
            <h4>{movies[id].description}</h4>
            <img src={movies[id].poster}/>
        </>
    )
}