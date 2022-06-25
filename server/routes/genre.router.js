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

module.exports = router;