import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import MoviesSortedByGenres from '../MoviesSortedByGenre/MoviesSortedByGenres';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/details/:id" >
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/add-movie" exact>
          <MovieForm />
        </Route>

        <Route path="/genres/:genre" exact>
          <MoviesSortedByGenres />
        </Route>

      </Router>
    </div>
  );
}


export default App;
