const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//Route to get the list of movies for home page
router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

//Route to get the detailed view of the movies
router.get('/:id', (req, res) => {
  console.log('get params', req.params.id)

  const movieDetailsQuery = `
  SELECT 
	  movies.title,
	  movies.poster,
	  movies.description,
    json_agg(json_build_object('name', genres.name, 'id', genres.id)) as genre
  FROM movies
  JOIN movies_genres
	  ON movies.id = movies_genres.movie_id
  JOIN genres
	  ON movies_genres.genre_id = genres.id
  WHERE movies.id = $1
  GROUP BY movies.title, movies.poster, movies.description;
  `

  const movieDetailsParams = [req.params.id]

  pool.query(movieDetailsQuery, movieDetailsParams)
      .then((dbRes) => {
        res.send(dbRes.rows)
      })
      .catch((err) => {
        console.log('Failed to get movie details', err)
      })

})

//Route to post a new movie
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})
//Route to update an existing movie
router.put('/:id', (req, res) => {
  console.log('Testing PUT ID params', req.params.id)
  const newMovieDetailsQuery = `
    UPDATE movies
    SET title = $1, description = $2
    WHERE id = $3
  `
  const sqlParams = [
    req.body.title,
    req.body.description,
    Number(req.params.id)
  ]
  pool.query(newMovieDetailsQuery, sqlParams)
      .then(dsRes => {
        res.sendStatus(201)
      })
      .catch(err => {
        console.error('failed to update movie details', err)
      })
})

module.exports = router;