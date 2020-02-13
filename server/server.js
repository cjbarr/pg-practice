//requires
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');
//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
//globals
const port = 5000;

//db setup
const pool = new pg.Pool({
  database: 'music_library',
  host: 'localhost',
  port: 5432,
  max: 12,
  idleTimeoutMillis: 30000
}); //end pool

//server up
app.listen(port, () => {
  console.log('server up on', port)
});
//routes
app.get('/songs', (req, res) => {
  console.log('in songs GET');
  //set up a query
  let queryString = 'SELECT * FROM songs ORDER BY "rank" ASC';
  //try to run query on our pool
  pool.query(queryString).then((results) => {
    res.send(results.rows);
    //if successful we'll send a response with rows from results
  }).catch((err) => {
    //catch any errors
    console.log(err);
    res.sendStatus(500);
  })

}) //end /songs GET

app.put('/songs/:id', (req, res) => {
  console.log('in /songs PUT', req.params.id, req.body );
  if (req.body.voteDirection == 'up'){
        let queryString = `UPDATE songs SET rank = rank-1 WHERE "id"=${req.params.id}`;
          pool.query(queryString).then((results) => {
                res.sendStatus(200);
    }).catch((err) => {
          console.log(err);
          res.sendStatus(500);
    })
  }
else if (req.body.voteDirection == 'down'){
  let queryString = `UPDATE songs SET rank = rank+1 WHERE "id"=${req.params.id}`;
    pool.query(queryString).then((results) => {
          res.sendStatus(200);
}).catch((err) => {
      console.log(err);
      res.sendStatus(500);
})
}
  })


app.delete('/songs/:id', (req, res) => {
  console.log('in /songs delete', req.params.id);
  let queryString = `DELETE FROM songs WHERE "id"=$1`;
  pool.query(queryString, [req.params.id]).then((results) => {
    res.send(results.rows);
  }).catch((err) => {
    //catch any errors
    console.log(err);
    res.sendStatus(500);
  })
})

app.post('/songs', (req, res) => {
  console.log('in songs POST', req.body);
  let queryString = 'INSERT INTO songs("rank","artist","track","published") VALUES($1, $2, $3, $4)';
  pool.query(queryString, [req.body.rank, req.body.artist, req.body.track, req.body.published]).then((results) => {
    console.log('track added to db');
    res.sendStatus(201);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})