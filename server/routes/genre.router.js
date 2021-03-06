const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//Route to get all genres to diplay list on home page
router.get('/', (req, res) => {
  // Add query to get all genres
  console.log(req.params.id)

  const sqlQuery = `
    SELECT name
    FROM genres;
  `

  pool.query(sqlQuery)
      .then((dbRes) => {
        res.send(dbRes.rows)
      })
      .catch(err => {
        console.log('Failed to get genres', err)
        res.sendStatus(500)
      })
});

//Route to add a new genre to a movie
router.post('/', (req, res) => {
  
  const addGenreToMovieQuery = `
    INSERT INTO movies_genres
    (movie_id, genre_id)
    VALUES 
    ($1, $2);
  `
  const sqlParams = [req.body.movie_id, req.body.genre_id]

  pool.query(addGenreToMovieQuery, sqlParams)
      .then(dbRes => {
        res.sendStatus(201)
      })
      .catch(err => {
        console.log('FAILED to add genre', err)
        res.sendStatus(500)
      })
})

//Route to delete a genre from a movie
router.delete('/', (req, res) => {
  console.log(req.body)
  const genreToDeleteFromMovie = `
    DELETE FROM movies_genres
    WHERE movie_id = $1
    AND genre_id = $2;
  `
  
  const sqlParams = [req.body.movieId, req.body.genreId]

  pool.query(genreToDeleteFromMovie, sqlParams)
      .then(dbRes => {
        res.sendStatus(200)
     
      })
      .catch(err => {
        console.log('Failed to delete', err)
        res.sendStatus(500)
      })
})

router.get('/:genre', (req, res) => {

  const moviesByGenre = `
    SELECT movies.*
    FROM movies
    JOIN movies_genres
      ON movies_genres.movie_id = movies.id
    JOIN genres
      ON movies_genres.genre_id = genres.id
    WHERE genres.name = $1;  
  `
  pool.query(moviesByGenre, [req.params.genre])
      .then(dbRes => {
        res.send(dbRes.rows)
      })
      .catch(err => {
        console.error('Failed to get movies by genres', err)
      })

})


module.exports = router;