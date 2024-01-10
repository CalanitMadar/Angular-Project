const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const multer = require('multer');
const db = require( "./DB/ConnectionDatabase");


// Body parser middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(cors());

app.get('/getData', async (req, res) => {
    try {
      // Assuming 'movies' is the table name
      const query = 'SELECT * FROM movie';
      
      // Execute the query
      const result = await db.query(query);
  
      // Sending the result as JSON
      //console.log(result);
      //res.send(result)
      res.json(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.put('/movies/:id/favorite', async (req, res) => {
    try {
      const movieId = req.params.id;
      const { favorite } = req.body;
      const updateQuery = `UPDATE movie SET favorite = ? WHERE id = ?`;
  
      await db.query(updateQuery, [favorite, movieId]);
  
      res.send({ message: 'Favorite status updated' });
    } catch (error) {
      console.error('Error updating favorite status:', error);
      res.status(500).send('Internal Server Error');
    }
  });



  app.get('/favorite-movies', async (req, res) => {
    try {
        const query = 'SELECT * FROM movie WHERE favorite = 1';
        const result = await db.query(query);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error('Error fetching favorite movies:', error);
        res.status(500).send('Internal Server Error');
    }
});


  
 app.listen (port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
