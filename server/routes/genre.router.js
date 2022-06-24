const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres
  console.log(req.params.id)
  const sqlQuery = `
    SELECT 
    genres.name 
    FROM movies
    JOIN movies_genres
      ON movies_genres.movie_id = movies.id
    JOIN genres
      ON movies_genres.genre_id = genres.id
    WHERE movies.id = $1;
  `
  const sqlParams = [req.params.id]

  pool.query(sqlQuery, sqlParams)
      .then((dbRes) => {
        res.send(dbRes.rows)
      })
      .catch(err => {
        console.log('Failed to get genres', err)
        res.sendStatus(500)
      })
});

module.exports = router;