const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres
  console.log(req.params.id)
  /***********************************************\
  *TODO... CHANGE THIS TO SELECT ALL OF THE GENRES*
  \***********************************************/
  const sqlQuery = `
  
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
        res.sendStatus(204)
      })
      .catch(err => {
        console.log('FAILED to add genre', err)
        res.sendStatus(500)
      })
})

module.exports = router;